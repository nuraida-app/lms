import express from "express";
import { client } from "../../connection/connection.js";
import { authorize } from "../../middleware/authenticate.js";

const router = express.Router();

// Membuat token
function generateCode() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  let code = "";

  // Menambahkan 2 huruf pertama
  for (let i = 0; i < 2; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  // Menambahkan 2 angka
  for (let i = 0; i < 2; i++) {
    code += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  // Menambahkan 2 huruf terakhir
  for (let i = 0; i < 2; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  return code;
}

// Membuat jadwal ujian
router.post("/create", authorize("admin", "teacher"), async (req, res) => {
  try {
    const { name, teacherId, quizId, gradeId, id, homeId, time } = req.body;

    const normalized_name = name.toLowerCase().replace(/\s+/g, "");

    if (id) {
      // Check if the record with the given id exists
      const existing = await client.query(
        "SELECT * FROM schedules WHERE id = $1",
        [id]
      );

      if (existing.rowCount > 0) {
        // Update the record without changing the token
        await client.query(
          `UPDATE schedules SET name = $1, teacher_id = $2, quiz_id = $3, 
           grade_id = $4, homebase_id = $5, time = $6
           WHERE id = $7`,
          [name, teacherId, quizId, gradeId, homeId, time, id]
        );

        return res.status(200).json({ message: "Data berhasil diperbarui" });
      } else {
        return res
          .status(404)
          .json({ message: "Data dengan ID tersebut tidak ditemukan" });
      }
    } else {
      // Check if a schedule with the same normalized name already exists
      const checking = await client.query(
        "SELECT * FROM schedules WHERE REPLACE(LOWER(name), ' ', '') = $1",
        [normalized_name]
      );

      if (checking.rowCount > 0) {
        return res.status(500).json({ message: "Nama ujian sudah digunakan" });
      } else {
        const code = generateCode();

        // Insert a new record
        await client.query(
          `INSERT INTO schedules(name, token, teacher_id, quiz_id, grade_id, homebase_id, time)
           VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
          [name, code, teacherId, quizId, gradeId, homeId, time]
        );

        return res.status(200).json({ message: "Berhasil ditambahkan" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

// Menampilkan seluruh jadwal ujian
router.get("/get", authorize("admin", "teacher"), async (req, res) => {
  try {
    const admin = req.user.role === "admin";
    const { page = 1, limit = 10, search = "" } = req.query;

    const offset = (page - 1) * limit;
    const searchQuery = `%${search}%`;

    if (admin) {
      const countResult = await client.query(
        "SELECT COUNT(*) AS total FROM schedules " +
          "INNER JOIN user_teacher ON schedules.teacher_id = user_teacher.id " +
          "INNER JOIN quizzes ON schedules.quiz_id = quizzes.id " +
          "INNER JOIN grades ON schedules.grade_id = grades.id " +
          "WHERE schedules.homebase_id = $1 AND (schedules.name ILIKE $2 OR quizzes.quiz_name ILIKE $2 OR user_teacher.name ILIKE $2)",
        [req.user.homebase_id, searchQuery]
      );

      const totalRecords = parseInt(countResult.rows[0].total, 10);
      const totalPages = Math.ceil(totalRecords / limit);

      const data = await client.query(
        "SELECT schedules.id, schedules.name, schedules.quiz_id, schedules.description, schedules.token, grades.grade, schedules.time, " +
          "schedules.homebase_id, " +
          "user_teacher.name AS teacher, quizzes.quiz_name AS quiz, " +
          "schedules.status, schedules.start, schedules.end, schedules.grade_id " +
          "FROM schedules " +
          "INNER JOIN user_teacher ON schedules.teacher_id = user_teacher.id " +
          "INNER JOIN quizzes ON schedules.quiz_id = quizzes.id " +
          "INNER JOIN grades ON schedules.grade_id = grades.id " +
          "WHERE schedules.homebase_id = $1 AND (schedules.name ILIKE $2 OR quizzes.quiz_name ILIKE $2 OR user_teacher.name ILIKE $2) " +
          "ORDER BY user_teacher.name ASC LIMIT $3 OFFSET $4",
        [req.user.homebase_id, searchQuery, limit, offset]
      );

      const rooms = data.rows;

      return res.status(200).json({ rooms, totalPages, totalRecords });
    } else {
      const countResult = await client.query(
        "SELECT COUNT(*) AS total FROM schedules " +
          "INNER JOIN user_teacher ON schedules.teacher_id = user_teacher.id " +
          "INNER JOIN quizzes ON schedules.quiz_id = quizzes.id " +
          "INNER JOIN grades ON schedules.grade_id = grades.id " +
          "WHERE schedules.teacher_id = $1 AND (schedules.name ILIKE $2 OR quizzes.quiz_name ILIKE $2 OR user_teacher.name ILIKE $2)",
        [req.user.id, searchQuery]
      );

      const totalRecords = parseInt(countResult.rows[0].total, 10);
      const totalPages = Math.ceil(totalRecords / limit);

      const data = await client.query(
        "SELECT schedules.id, schedules.name, schedules.quiz_id, schedules.description, schedules.token, grades.grade, schedules.time, " +
          "schedules.homebase_id, " +
          "user_teacher.name AS teacher, quizzes.quiz_name AS quiz, " +
          "schedules.status, schedules.start, schedules.end, schedules.grade_id " +
          "FROM schedules " +
          "INNER JOIN user_teacher ON schedules.teacher_id = user_teacher.id " +
          "INNER JOIN quizzes ON schedules.quiz_id = quizzes.id " +
          "INNER JOIN grades ON schedules.grade_id = grades.id " +
          "WHERE schedules.teacher_id = $1 AND (schedules.name ILIKE $2 OR quizzes.quiz_name ILIKE $2 OR user_teacher.name ILIKE $2) " +
          "ORDER BY schedules.name ASC LIMIT $3 OFFSET $4",
        [req.user.id, searchQuery, limit, offset]
      );

      const rooms = data.rows;

      return res.status(200).json({ rooms, totalPages, totalRecords });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

// jadwal berdasarkan tingkat
router.get("/get-by-grade", authorize("student", "admin"), async (req, res) => {
  try {
    // Ambil parameter dari query
    const { page = 1, limit = 10, search = "", grade } = req.query;

    // Konversi page dan limit ke integer
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const offset = (pageNumber - 1) * limitNumber;

    // Query untuk total data
    const totalDataQuery = await client.query(
      "SELECT COUNT(*) AS total FROM schedules " +
        "INNER JOIN grades ON schedules.grade_id = grades.id " +
        "WHERE schedules.grade_id = $1 AND schedules.name ILIKE $2",
      [grade, `%${search}%`]
    );
    const totalData = parseInt(totalDataQuery.rows[0].total, 10);

    // Hitung total halaman
    const totalPages = Math.ceil(totalData / limitNumber);

    // Query untuk data dengan paginasi dan pencarian
    const dataQuery = await client.query(
      `SELECT schedules.id, schedules.name, schedules.quiz_id, schedules.status, 
        schedules.description, schedules.token, grades.grade, schedules.time,
          user_teacher.name AS teacher, quizzes.quiz_name AS quiz,
          schedules.start, schedules.end 
          FROM schedules 
          INNER JOIN grades ON schedules.grade_id = grades.id 
          INNER JOIN quizzes ON schedules.quiz_id = quizzes.id 
          INNER JOIN user_teacher ON schedules.teacher_id = user_teacher.id
          WHERE schedules.grade_id = $1 AND schedules.status = true AND 
          (schedules.name ILIKE $2 OR user_teacher.name ILIKE $2) 
          ORDER BY schedules.name ASC
          LIMIT $3 OFFSET $4`,
      [grade, `%${search}%`, limitNumber, offset]
    );

    const schedules = dataQuery.rows;

    // Respon dengan data paginasi
    res.status(200).json({
      schedules,
      page: pageNumber,
      limit: limitNumber,
      totalData,
      totalPages,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

// Detail Schedule
router.get("/detail/:id", authorize("admin", "teacher"), async (req, res) => {
  try {
    const data = await client.query(
      "SELECT schedules.id, schedules.name AS schedule, schedules.quiz_id, schedules.description, " +
        "schedules.token, schedules.grade_id, schedules.grade_id, schedules.time, schedules.homebase_id, " +
        "schedules.teacher_id, schedules.status, schedules.start, schedules.end FROM schedules " +
        "WHERE schedules.id = $1",
      [req.params.id]
    );

    const room = data.rows[0];

    res.status(200).json(room);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Memperbarui jadwal ujian ujian
router.put("/update/:id", authorize("admin", "teacher"), async (req, res) => {
  try {
    const { name, desc, teacherId, quizId, start, end, gradeId } = req.body;

    await client.query(
      `UPDATE schedules SET name = $1, description = $2, teacher_id = $3, 
          quiz_id = $4, start = $5, "end" = $6, grade_id = $7 
          WHERE id = $8 RETURNING *`,
      [name, desc, teacherId, quizId, start, end, gradeId, req.params.id]
    );

    res.status(200).json({ message: "Schedule is updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

// Update status
router.put(
  "/update-status/:id",
  authorize("admin", "teacher"),
  async (req, res) => {
    try {
      const { id } = req.params;

      const room = await client.query("SELECT * FROM schedules WHERE id = $1", [
        id,
      ]);

      const data = room.rows[0];

      const active = true;
      const inactive = false;

      if (data.status) {
        await client.query("UPDATE schedules SET status = $1 WHERE id = $2", [
          inactive,
          id,
        ]);

        res.status(200).json({ message: "Status tidak aktif" });
      } else {
        await client.query("UPDATE schedules SET status = $1 WHERE id = $2", [
          active,
          id,
        ]);

        res.status(200).json({ message: "Status aktif" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }
);

// Menghapus Jadwal ujian
router.delete(
  "/delete/:id",
  authorize("admin", "teacher"),
  async (req, res) => {
    try {
      await client.query("DELETE FROM schedules where id = $1", [
        req.params.id,
      ]);

      res.status(200).json({ message: "Berhasil dihapus" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// Menghapus seluruh ruang
router.delete("/clear-data", authorize("admin", "guru"), async (req, res) => {
  try {
    const role = req.user.role;
    const ids = req.body.ids;

    if (role === "admin") {
      await client.query("DELETE FROM ruang");

      await client.query("DELETE FROM jawaban WHERE bank_id = ANY($1::int[])", [
        ids,
      ]);

      return res
        .status(200)
        .json({ message: "Seluruh jadwal berhasil dihapus" });
    } else {
      await client.query("DELETE FROM ruang WHERE guru = $1", [req.user.id]);

      await client.query("DELETE FROM jawaban WHERE bank_id = ANY($1::int[])", [
        ids,
      ]);

      return res
        .status(200)
        .json({ message: "Seluruh jadwal berhasil dihapus" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

export default router;
