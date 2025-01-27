import express from "express";
import { client } from "../../connection/connection.js";

const router = express.Router();

const fetchQueryResults = async (query, params = []) => {
  try {
    const { rows } = await client.query(query, params);
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const buildStudentData = async (rows) => {
  return Promise.all(
    rows.map(async (row) => {
      const dates = await fetchQueryResults(
        `SELECT DISTINCT DATE(createdat) AS date FROM t_scoring WHERE nis = $1 AND type_id = $2`,
        [row.nis, row.type_id]
      );

      return Promise.all(
        dates.map(async (date) => {
          const surahs = await fetchQueryResults(
            `SELECT * FROM t_process
             INNER JOIN t_alquran ON t_process.from_id = t_alquran.id
             WHERE nis = $1 AND DATE(t_process.createdat) = $2`,
            [row.nis, date.date]
          );

          const categories = await fetchQueryResults(
            `SELECT 
          t_scoring.*, 
          t_categories.name, 
          DATE(t_scoring.createdat) AS created_date 
       FROM 
          t_scoring 
       LEFT JOIN 
          t_categories 
       ON 
          t_scoring.category_id = t_categories.id
       WHERE 
          t_scoring.indicator_id IS NULL 
          AND t_scoring.type_id = $1 AND t_scoring.nis = $2 AND DATE(t_scoring.createdat) = $3`,
            [row.type_id, row.nis, date.date]
          );

          const indicators = await fetchQueryResults(
            `SELECT 
          t_scoring.*, 
          t_indicators.name, 
          DATE(t_scoring.createdat) AS created_date 
       FROM 
          t_scoring 
       LEFT JOIN 
          t_indicators 
       ON 
          t_scoring.indicator_id = t_indicators.id
       WHERE 
          t_scoring.indicator_id IS NOT NULL 
          AND t_scoring.type_id = $1 AND t_scoring.nis = $2 AND DATE(t_scoring.createdat) = $3
       ORDER BY 
          t_indicators.name ASC`,
            [row.type_id, row.nis, date.date]
          );

          const scores = categories.map((category) => {
            const relatedIndicators = indicators.filter(
              (indi) => indi.category_id === category.category_id
            );

            return {
              id: category.id,
              category_id: category.category_id,
              category: category.name,
              poin: Number(category.poin),
              date: category.created_date,
              indicators: relatedIndicators.map((indi) => ({
                id: indi.id,
                indicator_id: indi.indicator_id,
                indicator: indi.name,
                poin: Number(indi.poin),
              })),
            };
          });

          const totalPoints = scores.reduce(
            (acc, score) => acc + score.poin,
            0
          );

          return {
            nis: row.nis,
            name: row.student_name,
            grade: row.grade,
            class: row.class_name,
            scores,
            surahs: surahs.map((surah) => ({
              id: surah.id,
              surah_id: surah.from_id,
              name: surah.name,
              from_ayat: surah.from_count,
              to_ayat: surah.to_count,
            })),
            type: row.type_name,
            examiner: row.examiner_name,
            totalPoints,
            date: date.date,
          };
        })
      );
    })
  ).then((nestedResults) => nestedResults.flat());
};

router.get("/get-report/:type_id", async (req, res) => {
  try {
    const { type_id } = req.params;

    const mainQuery = `
      SELECT
        sc.nis,
        us.name AS student_name,
        g.grade,
        c.name AS class_name,
        t.name AS type_name,
        e.name AS examiner_name,
        ts.type_id
      FROM
        students_class sc
        INNER JOIN user_student us ON sc.nis = us.nis
        INNER JOIN grades g ON sc.grade_id = g.id
        INNER JOIN classes c ON sc.class_code = c.code
        INNER JOIN t_scoring ts ON sc.nis = ts.nis
        INNER JOIN t_type t ON ts.type_id = t.id
        INNER JOIN t_examiner e ON ts.examiner_id = e.id
      WHERE
        ts.type_id = $1
      GROUP BY
        sc.nis, us.name, g.grade, c.name, t.name, e.name, ts.type_id
    `;

    const rows = await fetchQueryResults(mainQuery, [type_id]);

    const result = await buildStudentData(rows, type_id);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
