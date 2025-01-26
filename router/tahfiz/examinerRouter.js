import express from "express";
import { authorize } from "../../middleware/authenticate.js";
import { client } from "../../connection/connection.js";

const router = express.Router();

const update = "Berhasil disimpan";
const create = "Berhasil ditambahkan";
const del = "Berhasil dihapus";

router.post("/add-examiner", authorize("tahfiz"), async (req, res) => {
  try {
    const { id, name } = req.body;

    if (id) {
      await client.query(`UPDATE t_examiner SET name = $1 WHERE id = $2`, [
        name,
        id,
      ]);
    } else {
      await client.query(
        `INSERT INTO t_examiner(name, createdat) VALUES ($1, NOW())`,
        [name]
      );
    }

    res.status(201).json({ message: id ? update : create });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/get-examiners", authorize("tahfiz"), async (req, res) => {
  try {
    const { page, limit, search = "" } = req.query;

    const searchQuery = `%${search}%`;

    if (!page && !limit) {
      const data = await client.query(
        `SELECT * FROM t_examiner WHERE name ILIKE $1 ORDER BY id`,
        [searchQuery]
      );

      return res.status(200).json(data.rows);
    }

    const pageNum = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    const offset = (pageNum - 1) * limitNumber;

    // Get total data count
    const totalDataQuery = await client.query(
      `SELECT COUNT(*) AS total FROM t_examiner WHERE name ILIKE $1`,
      [searchQuery]
    );
    const totalData = parseInt(totalDataQuery.rows[0].total);

    // Fetch paginated data
    const data = await client.query(
      `SELECT * FROM t_examiner WHERE name ILIKE $1 
       ORDER BY id LIMIT $2 OFFSET $3`,
      [searchQuery, limitNumber, offset]
    );

    res.status(200).json({
      examiners: data.rows,
      totalData,
      totalPages: Math.ceil(totalData / limitNumber),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete-examiner/:id", authorize("tahfiz"), async (req, res) => {
  try {
    await client.query(`DELETE FROM t_examiner WHERE id = $1`, [req.params.id]);

    res.status(200).json({ message: del });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// router.get("/get-daily-report", async (req, res) => {
//   try {
//     const query = `
//       SELECT
//         sc.nis,
//         us.name AS student_name,
//         g.grade,
//         c.name AS class_name,
//         t.name AS type_name,
//         e.name AS examiner_name
//       FROM
//         students_class sc
//         INNER JOIN user_student us ON sc.nis = us.nis
//         INNER JOIN grades g ON sc.grade_id = g.id
//         INNER JOIN classes c ON sc.class_code = c.code
//         INNER JOIN t_scoring ts ON sc.nis = ts.nis
//         INNER JOIN t_type t ON ts.type_id = t.id
//         INNER JOIN t_examiner e ON ts.examiner_id = e.id
//         LEFT JOIN t_categories tc ON ts.category_id = tc.id
//       GROUP BY
//         sc.nis, us.name, g.grade, c.name, t.name, e.name
//     `;

//     const { rows } = await client.query(query);

//     const categories = await client.query(`
//       SELECT * FROM t_scoring
//       LEFT JOIN t_categories ON t_scoring.category_id = t_categories.id
//       WHERE indicator_id IS NULL
//     `);

//     const indicators = await client.query(`
//       SELECT * FROM t_scoring
//       LEFT JOIN t_indicators ON t_scoring.indicator_id = t_indicators.id
//       WHERE indicator_id IS NOT NULL
//       ORDER BY t_indicators.name ASC
//     `);

//     // Loop through rows to fetch 'surahs' data for each 'nis'
//     const result = await Promise.all(
//       rows.map(async (row) => {
//         // Fetch surahs based on nis
//         const surahs = await client.query(
//           `SELECT * FROM t_process
//           INNER JOIN t_alquran ON t_process.from_id = t_alquran.id
//           WHERE nis = $1`,
//           [row.nis]
//         );

//         const date = await client.query(
//           `SELECT DISTINCT DATE(createdat) FROM t_scoring WHERE nis = $1`,
//           [row.nis]
//         );

//         return {
//           nis: row.nis,
//           name: row.student_name,
//           grade: row.grade,
//           class: row.class_name,
//           scores: categories.rows?.map((row) => ({
//             id: row.id,
//             category_id: row.category_id,
//             category: row.name,
//             poin: Number(row.poin),
//             indicators: indicators.rows
//               .filter((indicator) => indicator.category_id === row.category_id)
//               ?.map((indi) => ({
//                 id: indi.id,
//                 indicator_id: indi.indicator_id,
//                 indicator: indi.name,
//                 poin: indi.poin,
//               })),
//           })),
//           surahs: surahs.rows?.map((row) => ({
//             id: row.id,
//             surah_id: row.from_id,
//             name: row.name,
//             from_ayat: row.from_count,
//             to_ayat: row.to_count,
//           })),
//           type: row.type_name,
//           examiner: row.examiner_name,
//           date: date.rows[0].date,
//         };
//       })
//     );

//     res.status(200).json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// });

export default router;
