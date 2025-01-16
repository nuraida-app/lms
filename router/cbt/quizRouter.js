import express from "express";
import { client } from "../../connection/connection.js";
import { authorize } from "../../middleware/authenticate.js";

const router = express.Router();

// Menambahkan bank soal
router.post("/create", authorize("admin", "teacher"), async (req, res) => {
  try {
    const { id, teacherId, gradeId, quizName, shuffle, mc, essay, homeId } =
      req.body;

    // Normalisasi nama bank soal dengan menghilangkan spasi dan mengubah menjadi huruf kecil
    const normalized_name = quizName.toLowerCase().replace(/\s+/g, "");

    // Jika `id` ada, lakukan update
    if (id) {
      // Periksa apakah nama bank soal sudah digunakan oleh quiz lain
      const checking = await client.query(
        "SELECT * FROM quizzes WHERE REPLACE(LOWER(quiz_name), ' ', '') = $1 AND id != $2",
        [normalized_name, id]
      );

      if (checking.rowCount > 0) {
        return res
          .status(500)
          .json({ message: "Nama Bank soal sudah digunakan" });
      }

      // Update data jika id ditemukan
      await client.query(
        `UPDATE quizzes 
         SET teacher_id = $1, grade_id = $2, quiz_name = $3, 
             shuffle = $4, mc_weight = $5, essay_weight = $6, homebase_id = $7 
         WHERE id = $8 RETURNING *`,
        [teacherId, gradeId, quizName, shuffle, mc, essay, homeId, id]
      );

      return res.status(200).json({ message: "Berhasil diperbarui" });
    }

    // Jika `id` tidak ada, lakukan insert data baru
    const checking = await client.query(
      "SELECT * FROM quizzes WHERE REPLACE(LOWER(quiz_name), ' ', '') = $1",
      [normalized_name]
    );

    if (checking.rowCount > 0) {
      return res
        .status(500)
        .json({ message: "Nama bank soal sudah digunakan" });
    } else {
      await client.query(
        `INSERT INTO quizzes (teacher_id, grade_id, quiz_name, 
          shuffle, mc_weight, essay_weight, homebase_id) 
          VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [teacherId, gradeId, quizName, shuffle, mc, essay, homeId]
      );

      return res.status(200).json({ message: "Berhasil ditambahkan" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

// Menampilkan bank soal
router.get("/get", authorize("admin", "teacher"), async (req, res) => {
  try {
    const teacher = req.user.role === "teacher";
    const admin = req.user.role === "admin";

    // Adding search filter and pagination
    const { page, limit, search, teacherId } = req.query;

    let query = `SELECT quizzes.id, quizzes.quiz_name, quizzes.teacher_id, user_teacher.name AS teacher, 
      quizzes.shuffle, quizzes.grade_id, quizzes.homebase_id, grades.grade, 
      (SELECT COUNT(*) FROM questions WHERE questions.quiz_id = quizzes.id AND questions.type = 1) AS mc, 
      (SELECT COUNT(*) FROM questions WHERE questions.quiz_id = quizzes.id AND questions.type = 2) AS essay
      FROM quizzes
      INNER JOIN user_teacher ON quizzes.teacher_id = user_teacher.id 
      INNER JOIN grades ON quizzes.grade_id = grades.id `;

    let queryParams = [];

    // Filtering by role
    if (teacher) {
      query += "WHERE quizzes.teacher_id = $1 ";
      queryParams.push(req.user.id);
    } else if (admin && teacherId) {
      query += "WHERE quizzes.homebase_id = $1 AND teacher_id = $2";
      queryParams.push(req.user.homebase_id, teacherId);
    } else if (admin) {
      query += "WHERE quizzes.homebase_id = $1 ";
      queryParams.push(req.user.homebase_id);
    }

    if (search) {
      const searchCondition = `${
        queryParams.length > 0 ? "AND" : "WHERE"
      } (quizzes.quiz_name ILIKE $${
        queryParams.length + 1
      } OR user_teacher.name ILIKE $${queryParams.length + 1})`;
      query += searchCondition;
      queryParams.push(`%${search}%`);
    }

    if (page && limit) {
      const offset = (page - 1) * limit;

      // Count total records for pagination
      const countQuery = `SELECT COUNT(*) AS total FROM (${query}) AS subquery`;
      const countResult = await client.query(countQuery, queryParams);
      const total = parseInt(countResult.rows[0].total);
      const totalPages = Math.ceil(total / limit);

      // Adding ordering and pagination
      query +=
        " ORDER BY user_teacher.name ASC LIMIT $" +
        (queryParams.length + 1) +
        " OFFSET $" +
        (queryParams.length + 2);
      queryParams.push(parseInt(limit));
      queryParams.push(parseInt(offset));

      const data = await client.query(query, queryParams);

      return res.status(200).json({
        quizes: data.rows,
        total,
        totalPages,
      });
    } else {
      // If no page, limit, and search, return all quizzes based on role
      query += " ORDER BY user_teacher.name ASC";
      const data = await client.query(query, queryParams);

      return res.status(200).json({
        quizes: data.rows,
        total: data.rows.length,
        totalPages: 1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

// Menampilkan bank soal berdasarkan guru
router.get(
  "/get-by-teacher/:teacherId",
  authorize("teachers"),
  async (req, res) => {
    try {
      const { teacherId } = req.params;

      const data = await client.query(
        "SELECT quizzes.id, quizzes.quiz_name, quizzes.teacher_id, teachers.name, " +
          "quizzes.grade_id, " +
          "(SELECT COUNT(*) FROM questions WHERE questions.quiz_id = quizzes.id AND questions.type = 1) AS type1, " +
          "(SELECT COUNT(*) FROM questions WHERE questions.quiz_id = quizzes.id AND questions.type = 2) AS type2 " +
          "FROM quizzes " +
          "INNER JOIN teachers ON quizzes.teacher_id = teachers.id " +
          "WHERE quizzes.teacher_id = $1",
        [teacherId]
      );

      res.status(200).json(data.rows);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
);

// Menampilkan ujian berdasarkan tingkat
router.get(
  "/get-by-grade/:grade",
  authorize("admin", "student"),
  async (req, res) => {
    try {
      const data = await client.query(
        "SELECT quizzes.id, quizzes.quiz_name, teachers.name, schedules.time_start, schedules.time_end, " +
          "grades.grade, schedules.token FROM quizzes  " +
          "INNER JOIN teachers ON quizzes.teacher_id = teachers.id " +
          "INNER JOIN grades ON quizzes.grade_id = grades.id " +
          "INNER JOIN schedules ON schedules.quiz_id = quizzes.id " +
          "WHERE quizzes.grade_id = $1  ORDER BY quizzes.quiz_name ASC",
        [req.params.grade]
      );

      const exams = data.rows;

      res.status(200).json(exams);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// Menampilkan bank soal berikut pertanyaanya
router.get("/:id", authorize("admin", "teachers"), async (req, res) => {
  try {
    const data = await client.query(
      "SELECT quizzes.quiz_name, bank.pg, bank.uraian, " +
        "pertanyaan.id, pertanyaan.bank_id, pertanyaan.jenis, pertanyaan.soal, " +
        "pertanyaan.a, pertanyaan.b, pertanyaan.c, pertanyaan.d, pertanyaan.e, pertanyaan.kunci, pertanyaan.poin " +
        "FROM bank LEFT JOIN pertanyaan ON bank.id = pertanyaan.bank_id WHERE bank.id = $1",
      [req.params.id]
    );

    const exam = {
      exam_name: data.rows[0].nama,
      time: data.rows[0].durasi,
      pg: data.rows[0].pg,
      essay: data.rows[0].uraian,
      questions: data.rows.map((row) => ({
        _id: row.id,
        exam_id: row.bank_id,
        quiz_type: row.jenis,
        quiz: row.soal,
        answer_1: row.a,
        answer_2: row.b,
        answer_3: row.c,
        answer_4: row.d,
        answer_5: row.e,
        key: row.kunci,
        poin: row.poin,
      })),
    };

    res.status(200).json(exam);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Menampilkan detail bank soal
router.get("/detail/:id", authorize("admin", "teacher"), async (req, res) => {
  try {
    const data = await client.query("SELECT * FROM quizzes where id = $1", [
      req.params.id,
    ]);

    if (data.rowCount === 0) {
      return res.status(404).json({ message: "Quizzes not found" });
    }

    res.status(200).json(data.rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

// Menghapus bank soal
router.delete(
  "/delete/:id",
  authorize("admin", "teacher"),
  async (req, res) => {
    try {
      const data = await client.query(
        "DELETE FROM quizzes WHERE id = $1 RETURNING *",
        [req.params.id]
      );

      await client.query("DELETE FROM schedules WHERE quiz_id = $1", [
        req.params.id,
      ]);

      await client.query("DELETE FROM answers WHERE quiz_id = $1", [
        req.params.id,
      ]);

      await client.query("DELETE FROM log WHERE quiz_id = $1", [req.params.id]);

      const delQuestion = await client.query(
        "DELETE FROM questions WHERE quiz_id = $1 RETURNING *",
        [req.params.id]
      );

      if (data.rowCount === 0) {
        return res.status(404).json({ message: "Data tidak ditemukan" });
      }

      res.status(200).json({
        message: `Bank soal and ${delQuestion.rowCount} pertanyaan berhasil dihapus`,
      });
    } catch (error) {
      clg;

      return res.status(500).json({ message: error.message });
    }
  }
);

// Clear data
router.delete(
  "/clear-data",
  authorize("admin", "teacher"),
  async (req, res) => {
    const role = req.user.role;
    const id = req.user.id;

    try {
      if (role === "admin") {
        await client.query("DELETE FROM quizzes");

        await client.query("DELETE FROM questions");

        await client.query("DELETE FROM answers");

        await client.query("DELETE FROM schedules");

        await client.query("DELETE FROM log");

        res.status(200).json({ message: "Data has been cleared" });
      } else {
        const quiz = await client.query(
          `SELECT * FROM quizzes WHERE teacher_id = $1`,
          [id]
        );

        await client.query("DELETE FROM quizzes WHERE teacher_id = $1", [id]);

        await client.query("DELETE FROM questions WHERE quiz_id = $1", [
          quiz.rows[0].quiz_id,
        ]);

        await client.query("DELETE FROM answers WHERE quiz_id = $1", [
          quiz.rows[0].quiz_id,
        ]);

        await client.query("DELETE FROM schedules WHERE quiz_id = $1", [
          quiz.rows[0].quiz_id,
        ]);

        await client.query("DELETE FROM log WHERE quiz_id = $1", [
          quiz.rows[0].quiz_id,
        ]);

        res.status(200).json({ message: "Data has been cleared" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

export default router;
