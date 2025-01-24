import express from "express";
import { authorize } from "../../middleware/authenticate.js";
import { client } from "../../connection/connection.js";

const router = express.Router();

router.get("/get-students", authorize("tahfiz"), async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const offset = (page - 1) * limit;

    // Query to get total count of unique NIS
    const countData = await client.query(
      `
      SELECT COUNT(DISTINCT students_class.nis) AS total
      FROM students_class
      INNER JOIN user_student ON user_student.nis = students_class.nis
      INNER JOIN homebase ON homebase.id = students_class.homebase_id
      INNER JOIN grades ON grades.id = students_class.grade_id
      INNER JOIN classes ON classes.code = students_class.class_code
      WHERE user_student.name ILIKE $1;
      `,
      [`%${search}%`]
    );

    const totalData = parseInt(countData.rows[0].total, 10);
    const totalPages = Math.ceil(totalData / limit);

    // Query to get paginated data with unique NIS
    const data = await client.query(
      `
      SELECT DISTINCT ON (students_class.nis) students_class.id, students_class.nis,
             user_student.name, homebase.name AS homebase, classes.name AS class, 
             grades.grade
      FROM students_class
      INNER JOIN user_student ON user_student.nis = students_class.nis
      INNER JOIN homebase ON homebase.id = students_class.homebase_id
      INNER JOIN grades ON grades.id = students_class.grade_id
      INNER JOIN classes ON classes.code = students_class.class_code
      WHERE user_student.name ILIKE $1
      ORDER BY students_class.nis DESC
      LIMIT $2 OFFSET $3;
      `,
      [`%${search}%`, limit, offset]
    );

    const students = data.rows;

    res.status(200).json({
      students,
      totalData,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/add-score", authorize("tahfiz"), async (req, res) => {
  try {
    const { nis, poin } = req.body;

    if (!nis || !poin || !poin.categories) {
      return res.status(400).json({ error: "Invalid request body." });
    }

    // Start transaction
    await client.query("BEGIN");

    // Insert data into t_scoring
    for (const category of poin.categories) {
      const { category_id, poin: categoryPoin, indicators } = category;

      // Insert category-level data
      const categoryInsertQuery = `
        INSERT INTO t_scoring (nis, type_id, category_id, poin, createdat)
        VALUES ($1, $2, $3, $4, NOW())
        RETURNING id
      `;
      const categoryResult = await client.query(categoryInsertQuery, [
        nis,
        poin.type_id, // type_id from the main request body
        category_id,
        categoryPoin,
      ]);

      const scoringId = categoryResult.rows[0].id;

      // Insert indicator-level data if present
      if (indicators && indicators.length > 0) {
        for (const indicator of indicators) {
          const { indicator_id, poin: indicatorPoin } = indicator;

          const indicatorInsertQuery = `
            INSERT INTO t_scoring (nis, type_id, category_id, indicator_id, poin, createdat)
            VALUES ($1, $2, $3, $4, $5, NOW())
          `;
          await client.query(indicatorInsertQuery, [
            nis,
            poin.type_id,
            category_id,
            indicator_id,
            indicatorPoin,
          ]);
        }
      }
    }

    // Commit transaction
    await client.query("COMMIT");

    res.status(200).json({ message: "Berhasil disimpan" });
  } catch (error) {
    // Rollback transaction in case of error
    await client.query("ROLLBACK");
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
