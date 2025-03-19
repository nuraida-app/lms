import express from "express";
import { authorize } from "../../middleware/authenticate.js";
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
  // Gunakan Map untuk memastikan unik data per tanggal dan NIS
  const uniqueResults = new Map();

  for (const row of rows) {
    const dates = await fetchQueryResults(
      `SELECT DISTINCT DATE(createdat) AS date FROM t_scoring WHERE nis = $1 AND type_id = $2`,
      [row.nis, row.type_id]
    );

    for (const date of dates) {
      const uniqueKey = `${row.nis}_${date.date}_${row.type_id}`; // Kombinasi unik NIS dan tanggal

      if (!uniqueResults.has(uniqueKey)) {
        const surahs = await fetchQueryResults(
          `SELECT * FROM t_process
           INNER JOIN t_alquran ON t_process.from_id = t_alquran.id
           WHERE nis = $1 AND DATE(t_process.createdat) = $2 AND type_id = $3`,
          [row.nis, date.date, row.type_id]
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
              poin: indi.poin,
            })),
          };
        });

        const totalPoints = scores.reduce((acc, score) => acc + score.poin, 0);

        uniqueResults.set(uniqueKey, {
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
            from_line: surah.from_line,
            to_line: surah.to_line,
          })),
          type_id: row.type_id,
          type: row.type_name,
          examiner: row.examiner_name,
          examiner_id: row.examiner_id,
          totalPoints,
          date: date.date,
        });
      }
    }
  }

  // Return all unique results
  return Array.from(uniqueResults.values()).sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
};

router.get("/get-all", async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", type } = req.query;

    // Konversi page dan limit ke angka
    const numericLimit = parseInt(limit, 10);
    const numericOffset = (parseInt(page, 10) - 1) * numericLimit;

    // Kondisi tambahan untuk filter berdasarkan type_id
    const typeFilter = type ? "AND t.id = $2" : "";

    // Main query dengan search, type filter, dan pagination
    const mainQuery = `
      SELECT
        sc.nis,
        us.name AS student_name,
        g.grade,
        c.name AS class_name,
        t.name AS type_name,
        t.id AS type_id,
        e.name AS examiner_name,
        e.id AS examiner_id,
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
        LOWER(us.name) LIKE LOWER($1)
        ${typeFilter}
      GROUP BY
        sc.nis, us.name, g.grade, c.name, t.name, e.name, ts.type_id, t.id, e.id
      LIMIT ${numericLimit} OFFSET ${numericOffset}
    `;

    // Count query dengan search dan type filter
    const countQuery = `
      SELECT COUNT(*) AS total
      FROM (
        SELECT
          sc.nis
        FROM
          students_class sc
          INNER JOIN user_student us ON sc.nis = us.nis
          INNER JOIN grades g ON sc.grade_id = g.id
          INNER JOIN classes c ON sc.class_code = c.code
          INNER JOIN t_scoring ts ON sc.nis = ts.nis
          INNER JOIN t_type t ON ts.type_id = t.id
          INNER JOIN t_examiner e ON ts.examiner_id = e.id
        WHERE
          LOWER(us.name) LIKE LOWER($1)
          ${typeFilter}
        GROUP BY
          sc.nis, us.name, g.grade, c.name, t.name, e.name, ts.type_id, t.id, e.id
      ) AS subquery
    `;

    // Menyusun parameter secara dinamis
    const params = [`%${search}%`];
    if (type) {
      params.push(type); // Tambahkan type jika ada
    }

    // Eksekusi query utama
    const rows = await fetchQueryResults(mainQuery, params);

    // Eksekusi query untuk menghitung total data
    const countResult = await fetchQueryResults(countQuery, params);

    const totalData = parseInt(countResult[0]?.total || 0, 10);
    const totalPages = Math.ceil(totalData / numericLimit);

    // Memproses data untuk laporan
    const report = await buildStudentData(rows);

    res.status(200).json({
      report,
      totalData,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/get-report/:nis", async (req, res) => {
  try {
    const { nis } = req.params;
    const { page = 1, limit = 10 } = req.query;

    // Konversi page dan limit ke angka
    const numericLimit = parseInt(limit, 10);
    const numericOffset = (parseInt(page, 10) - 1) * numericLimit;

    // Main query untuk mendapatkan data siswa berdasarkan NIS dengan paginasi
    const mainQuery = `
      SELECT
        sc.nis,
        us.name AS student_name,
        g.grade,
        c.name AS class_name,
        t.name AS type_name,
        t.id AS type_id,
        e.name AS examiner_name,
        e.id AS examiner_id,
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
        sc.nis = $1
      GROUP BY
        sc.nis, us.name, g.grade, c.name, t.name, e.name, ts.type_id, t.id, e.id
      LIMIT ${numericLimit} OFFSET ${numericOffset}
    `;

    // Count query untuk menghitung total data
    const countQuery = `
      SELECT COUNT(*) AS total
      FROM (
        SELECT sc.nis
        FROM
          students_class sc
          INNER JOIN user_student us ON sc.nis = us.nis
          INNER JOIN grades g ON sc.grade_id = g.id
          INNER JOIN classes c ON sc.class_code = c.code
          INNER JOIN t_scoring ts ON sc.nis = ts.nis
          INNER JOIN t_type t ON ts.type_id = t.id
          INNER JOIN t_examiner e ON ts.examiner_id = e.id
        WHERE sc.nis = $1
        GROUP BY sc.nis, us.name, g.grade, c.name, t.name, e.name, ts.type_id, t.id, e.id
      ) AS subquery
    `;

    // Eksekusi query utama
    const rows = await fetchQueryResults(mainQuery, [nis]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    // Eksekusi query untuk menghitung total data
    const countResult = await fetchQueryResults(countQuery, [nis]);
    const totalData = parseInt(countResult[0]?.total || 0, 10);
    const totalPages = Math.ceil(totalData / numericLimit);

    // Memproses data untuk laporan
    const report = await buildStudentData(rows);

    res.status(200).json({
      report,
      totalData,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/get-report/:type_id", async (req, res) => {
  try {
    const { type_id } = req.params;
    const { page, limit, search } = req.query;

    const mainQuery = `
      SELECT
        sc.nis,
        us.name AS student_name,
        g.grade,
        c.name AS class_name,
        t.name AS type_name,
        t.id AS type_id,
        e.name AS examiner_name,
        e.id AS examiner_id,
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
        sc.nis, us.name, g.grade, c.name, t.name, e.name, ts.type_id, t.id, e.id
    `;

    const rows = await fetchQueryResults(mainQuery, [type_id]);

    const result = await buildStudentData(rows, type_id);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete-report", authorize("tahfiz"), async (req, res) => {
  try {
    const { nis, typeId, createdat } = req.query;

    console.log(req.query);

    // Konversi ISO date string ke format yang sesuai untuk SQL timestamp
    const formattedDate = new Date(createdat).toISOString(); // Pastikan validasi dilakukan

    if (isNaN(Date.parse(formattedDate))) {
      return res.status(400).json({ message: "Invalid date format." });
    }

    // Query untuk menghapus data berdasarkan nis, type_id, dan createdat
    const deleteScore = `
        DELETE FROM t_scoring
        WHERE nis = $1 AND type_id = $2 AND DATE(createdat) = $3
      `;

    const deleteSurah = `
    DELETE FROM t_process WHERE nis = $1 AND DATE(createdat) = $2
    `;

    const result = await client.query(deleteScore, [nis, typeId, createdat]);
    const resultSurah = await client.query(deleteSurah, [nis, createdat]);

    // Jika tidak ada data yang dihapus, berikan respons 404
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "Data not found or already deleted." });
    }

    res.status(200).json({ message: "Data successfully deleted." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/get-progress", async (req, res) => {
  try {
    const { page = 1, limit = 10, search, juzId = 30 } = req.query;
    const offset = (page - 1) * limit;

    const typeData = await client.query(
      `SELECT * FROM t_type WHERE name = 'Harian'`
    );
    const type = typeData.rows[0].id;

    const juzData = await client.query(
      `SELECT t_juz.id, t_juz.name,
          COALESCE((SELECT SUM(to_line) FROM t_juzitems WHERE t_juzitems.juz_id = t_juz.id), 0) AS total_line
        FROM t_juz
        WHERE t_juz.id = $1`,
      [juzId]
    );

    if (juzData.rows.length === 0) {
      return res.status(404).json({ message: "Juz not found" });
    }

    const juz = juzData.rows[0];

    const studentsData = await client.query(
      `WITH RankedProcess AS (
        SELECT t_process.nis, user_student.name, 
               MAX(grades.grade) AS grade, 
               MAX(classes.name) AS class_name,
               t_process.from_id, 
               MAX(t_process.to_line) AS to_line, 
               MAX(t_process.createdat) AS createdat
        FROM t_process
        LEFT JOIN user_student ON t_process.nis = user_student.nis
        LEFT JOIN students_class ON t_process.nis = students_class.nis
        LEFT JOIN grades ON students_class.grade_id = grades.id
        LEFT JOIN classes ON students_class.class_code = classes.code
        WHERE t_process.juz_id = $1 AND t_process.type_id = $2 AND user_student.isactive = true
        GROUP BY t_process.nis, user_student.name, t_process.from_id
      )
      SELECT nis, name, grade, class_name, SUM(to_line) AS total_line
      FROM RankedProcess
      GROUP BY nis, name, grade, class_name
      ORDER BY CAST(grade AS INTEGER) ASC, class_name ASC, name ASC
      LIMIT $3 OFFSET $4;`,
      [juzId, type, limit, offset]
    );

    const totalStudents = await client.query(
      `SELECT COUNT(DISTINCT nis) AS total FROM t_process WHERE juz_id = $1 AND type_id = $2`,
      [juzId, type]
    );

    const totalData = totalStudents.rows[0].total;
    const totalPages = Math.ceil(totalData / limit);

    const result = studentsData.rows.map((student) => ({
      nis: student.nis,
      name: student.name,
      grade: student.grade,
      class: student.class_name,
      juz: juz.name,
      total_line: student.total_line,
      percentage: ((student.total_line / juz.total_line) * 100).toFixed(2),
    }));

    res.status(200).json({
      totalData,
      totalPages,
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
