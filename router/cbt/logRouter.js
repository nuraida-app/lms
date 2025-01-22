import express from "express";
import { client } from "../../connection/connection.js";
import { authorize } from "../../middleware/authenticate.js";

const router = express.Router();

// Membuat log siswa
router.post("/create", authorize("student"), async (req, res) => {
  try {
    const { nis, quizId } = req.body;
    const date = new Date().toISOString();
    let ipAddress = req.socket.remoteAddress;
    const browser = req.useragent.browser + " " + req.useragent.version;

    // Jika alamat IP adalah IPv6, potong bagian IPv6 dan simpan hanya IPv4
    if (ipAddress.includes("::ffff:")) {
      ipAddress = ipAddress.split("::ffff:")[1];
    }

    // Periksa apakah ada nis dan bank_id yang sama dalam log
    const existingLog = await client.query(
      "SELECT * FROM log WHERE nis = $1 AND quiz_id = $2",
      [nis, quizId]
    );

    if (existingLog.rowCount > 0) {
      // Jika ada nis yang sama, hapus entri log yang terkait
      await client.query("DELETE FROM log WHERE nis = $1 AND quiz_id = $2", [
        nis,
        quizId,
      ]);
    }

    // Simpan data log baru
    await client.query(
      "INSERT INTO log (log_in, ip, browser, nis, quiz_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [date, ipAddress, browser, nis, quizId]
    );

    res.status(200).json({ message: "Joining Exam" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Menampilkan log siswa berdasarkan bank soal
router.get("/get", authorize("admin", "teacher"), async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", class_code, quizId } = req.query;
    const offset = (page - 1) * limit;

    // Prepare base query
    let query = `
        SELECT 
          log.*, 
          students_class.class_code, 
          user_student.name, 
          classes.name AS class_name
        FROM 
          log
        LEFT JOIN 
          students_class ON log.nis = students_class.nis
        LEFT JOIN 
          user_student ON log.nis = user_student.nis
        LEFT JOIN 
          classes ON students_class.class_code = classes.code
        WHERE 
          log.quiz_id = $1
      `;

    // Add filters for search and class_code
    const filters = [];
    const queryParams = [quizId];

    if (search) {
      // Separate filtering for bigint (nis) and text (name)
      filters.push(
        `(CAST(log.nis AS TEXT) ILIKE $${
          queryParams.length + 1
        } OR user_student.name ILIKE $${queryParams.length + 1})`
      );
      queryParams.push(`%${search}%`);
    }

    if (class_code) {
      filters.push(`students_class.class_code = $${queryParams.length + 1}`);
      queryParams.push(class_code);
    }

    // Append filters to query
    if (filters.length > 0) {
      query += " AND " + filters.join(" AND ");
    }

    // Add sorting and pagination
    query += ` ORDER BY classes.name, user_student.name LIMIT $${
      queryParams.length + 1
    } OFFSET $${queryParams.length + 2}`;
    queryParams.push(limit, offset);

    // Execute query
    const data = await client.query(query, queryParams);

    // Count total rows for pagination
    const countQuery =
      `
        SELECT COUNT(*) FROM log
        LEFT JOIN students_class ON log.nis = students_class.nis
        LEFT JOIN user_student ON log.nis = user_student.nis
        LEFT JOIN classes ON students_class.class_code = classes.code
        WHERE log.quiz_id = $1
      ` + (filters.length > 0 ? " AND " + filters.join(" AND ") : "");

    const countParams = [quizId];
    if (search) {
      countParams.push(`%${search}%`);
    }
    if (class_code) {
      countParams.push(class_code);
    }

    const totalCount = await client.query(countQuery, countParams);
    const total = parseInt(totalCount.rows[0].count, 10);

    res.status(200).json({
      logs: data.rows,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page, 10),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

// Menampilkan log berdasarkan nis
router.get("/detail/:nis/:quiz", authorize("student"), async (req, res) => {
  try {
    const { nis, quiz } = req.params;

    const data = await client.query(
      "SELECT * FROM log WHERE nis = $1 AND quiz_id = $2",
      [nis, quiz]
    );

    res.status(200).json(data.rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

// Selesaikan ujian
router.put("/finished/:quizId", authorize("student"), async (req, res) => {
  try {
    const quizId = req.params.quizId;

    const isActive = false;
    const isDone = true;

    const questions = await client.query(
      "SELECT * FROM questions WHERE quiz_id = $1",
      [quizId]
    );

    const myAnswersResult = await client.query(
      `SELECT DISTINCT ON (quiz_id, question_id, nis) *
         FROM answers 
         WHERE quiz_id = $1 AND nis = $2
         ORDER BY quiz_id, question_id, nis, createdAt DESC`,
      [quizId, req.user.nis]
    );

    const left = questions.rowCount - myAnswersResult.rowCount;

    if (left === 0) {
      await client.query(
        `UPDATE log SET "isActive" = $1, "isDone" = $2 WHERE quiz_id = $3 AND nis = $4 `,
        [isActive, isDone, quizId, req.user.nis]
      );

      res.status(200).json({ message: "Jawaban berhasil disimpan" });
    } else {
      return res
        .status(400)
        .json({ message: `Anda belum menjawab ${left} pertanyaan` });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Reset status
router.put(
  "/change-status-log",
  authorize("admin", "teacher"),
  async (req, res) => {
    try {
      const { nis, quizId, logId } = req.body;

      const isActive = false;
      const isDone = false;

      const result = await client.query(
        `UPDATE log SET "isActive" = $1, "isDone" = $2 
        WHERE id = $3 AND nis = $4 AND quiz_id = $5`,
        [isActive, isDone, logId, nis, quizId]
      );

      if (result.rowCount === 0) {
        return res
          .status(404)
          .json({ message: "No matching record found to update" });
      }

      res.status(200).json({ message: "Log successfully reseted" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }
);

// Mengulang ujian siswa
router.delete(
  "/clear-log-answers",
  authorize("admin", "teacher"),
  async (req, res) => {
    try {
      const { nis, quizId, logId } = req.body;

      await client.query(
        "DELETE FROM log WHERE id = $1 AND nis = $2 AND quiz_id = $3",
        [logId, nis, quizId]
      );

      await client.query(
        "DELETE FROM answers WHERE nis = $1 AND quiz_id = $2",
        [nis, quizId]
      );

      res.status(200).json({ message: "Log and answers cleared" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// Pelanggaran
router.put("/penalty/:nis", async (req, res) => {
  try {
    const penalty = 2;

    const data = await client.query(
      "UPDATE log SET pelanggaran = $1 WHERE nis = $2",
      [penalty, req.params.nis]
    );

    if (data.rowCount > 0) {
      res.status(200).json({ message: "kamu melanggar aturan" });
    } else {
      res.status(404).json({ message: "Data tidak ditemukan" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Membatalkan pelanggaran
router.put("/unlock/:nis", async (req, res) => {
  try {
    const penalty = 1;

    const data = await client.query(
      "UPDATE log SET pelanggaran = $1 WHERE nis = $2",
      [penalty, req.params.nis]
    );

    if (data.rowCount > 0) {
      res.status(200).json({ message: "Berhasil dibuka" });
    } else {
      res.status(404).json({ message: "Data tidak ditemukan" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Menghapus pelanggaran
router.delete(
  "/remove/:nis/:exam",
  authorize("admin", "guru"),
  async (req, res) => {
    try {
      const data = await client.query(
        "DELETE FROM log WHERE nis = $1 AND bank_id = $2",
        [req.params.nis, req.params.exam]
      );

      const result = await client.query(
        "DELETE FROM jawaban WHERE nis = $1 AND bank_id = $2",
        [req.params.nis, req.params.exam]
      );

      res.status(200).json({ message: "Berhasil dihapus" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }
);

export default router;
