import express from "express";
import { client } from "../../connection/connection.js";
import { authorize } from "../../middleware/authenticate.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const username = req.user.name.replace(/\s+/g, "_").toLowerCase();
    const userFolder = `./upload/lms/${username}`;

    // Create a folder if it doesn't already exist
    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder, { recursive: true });
    }
    cb(null, userFolder);
  },
  filename: (req, file, cb) => {
    const username = req.user.name.replace(/\s+/g, "_").toLowerCase();
    const fileCode = Math.floor(Math.random() * 10000000000000).toString(); // Generate a unique file code

    // Sanitize filename (replace spaces and special characters)
    const sanitizedFileCode = fileCode
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "_");
    const extension = path.extname(file.originalname).toLowerCase();

    cb(null, `${username}_${sanitizedFileCode}${extension}`);
  },
});

const uploadFile = multer({ storage: fileStorage });

// Chapters
router.post("/add-chapter", authorize("teacher"), async (req, res) => {
  try {
    const { id, code, title, classIds, goal, gradeid, teacher_id } = req.body;

    if (!title || !classIds || !goal || !code || !gradeid) {
      return res.status(400).json({ message: "Data input tidak lengkap" });
    }

    if (id) {
      // Jika id ada, coba lakukan update
      const data = await client.query(
        `SELECT * FROM lms_chapters WHERE id = $1`,
        [id]
      );

      if (data.rowCount > 0) {
        await client.query(
          `UPDATE lms_chapters SET title = $1, class_code = $2, goal = $3, grade_id = $4, teacher_id = $5
          WHERE id = $6`,
          [title, classIds, goal, gradeid, teacher_id, id]
        );

        return res.status(200).json({ message: "Berhasil diperbarui" });
      } else {
        return res.status(404).json({ message: "Data tidak ditemukan" });
      }
    } else {
      // Jika id tidak ada, lakukan insert
      await client.query(
        `INSERT INTO lms_chapters (subject_code, title, class_code, goal, grade_id, teacher_id)
          VALUES ($1, $2, $3, $4, $5, $6)`,
        [code, title, classIds, goal, gradeid, teacher_id]
      );

      return res.status(201).json({ message: "Berhasil disimpan" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

router.get(
  "/chapters",
  authorize("teacher", "admin", "super-admin", "student"),
  async (req, res) => {
    try {
      const { grade_id, subjectCode } = req.query;
      const { id: userId, role, nis } = req.user;

      // Bangun kondisi WHERE tambahan berdasarkan peran pengguna
      let additionalCondition = "";
      let queryParams = [subjectCode];

      let studentClassCode = null;

      if (role === "student") {
        // Ambil class_code berdasarkan nis untuk role student
        const classCodeResult = await client.query(
          `
          SELECT class_code
          FROM students_class
          WHERE nis = $1
          LIMIT 1
          `,
          [nis]
        );

        if (classCodeResult.rowCount > 0) {
          studentClassCode = classCodeResult.rows[0].class_code;
        } else {
          return res
            .status(404)
            .json({ message: "Class code not found for the student" });
        }

        additionalCondition = "AND cl.code = $2";
        queryParams.push(studentClassCode);
      } else if (role === "teacher") {
        additionalCondition = "AND c.teacher_id = $2";
        queryParams.push(userId);
      }

      if (grade_id) {
        additionalCondition += ` AND c.grade_id = $${queryParams.length + 1}`;
        queryParams.push(grade_id);
      }

      // Query untuk mendapatkan data gabungan dari semua tabel
      const data = await client.query(
        `
      SELECT 
        c.id AS chapter_id,
        c.title AS chapter_title,
        c.goal AS chapter_goal,
        c.created_at AS chapter_created_at,
        c.updated_at AS chapter_updated_at,
        c.grade_id AS chapter_grade_id,
        c.teacher_id AS chapter_teacher_id,
        t.id AS topic_id,
        t.title AS topic_title,
        t.goal AS topic_goal,
        t.chapter_id AS topic_chapter_id,
        t.created_at AS topic_created_at,
        t.updated_at AS topic_updated_at,
        f.id AS file_id,
        f.title AS file_title,
        f.link_file AS file_link,
        f.video AS file_video,
        g.grade AS grade_name,
        cl.name AS class_name,
        cl.code AS class_code,
        ut.name AS teacher_name
      FROM lms_chapters c
      LEFT JOIN lms_topics t ON t.chapter_id = c.id
      LEFT JOIN lms_files f ON f.topic_id = t.id
      LEFT JOIN grades g ON g.id = c.grade_id
      LEFT JOIN classes cl ON cl.grade_id = g.id
      LEFT JOIN user_teacher ut ON ut.id = c.teacher_id
      WHERE c.subject_code = $1
      ${additionalCondition}
      ORDER BY g.grade::int ASC, c.created_at ASC, cl.name ASC, t.id ASC, f.id ASC
      `,
        queryParams
      );

      if (data.rowCount > 0) {
        const chapters = data.rows;

        // Menstrukturkan data agar sesuai dengan kebutuhan frontend
        const structuredData = chapters.reduce((acc, row) => {
          let chapter = acc.find((ch) => ch.chapter_id === row.chapter_id);
          if (!chapter) {
            chapter = {
              chapter_id: row.chapter_id,
              chapter_title: row.chapter_title,
              chapter_goal: row.chapter_goal,
              grade_id: row.chapter_grade_id,
              grade_name: row.grade_name,
              teacher_id: row.chapter_teacher_id,
              teacher_name: row.teacher_name,
              class_names: new Set(), // Menggunakan Set untuk menghindari duplikasi nama kelas
              class_codes: new Set(),
              created_at: row.chapter_created_at,
              updated_at: row.chapter_updated_at,
              topics: [],
            };
            acc.push(chapter);
          }

          // Tambahkan nama kelas jika ada
          if (row.class_name) {
            chapter.class_names.add(row.class_name);
          }

          if (row.class_code) {
            chapter.class_codes.add(row.class_code);
          }

          if (row.topic_id) {
            let topic = chapter.topics.find(
              (tp) => tp.topic_id === row.topic_id
            );
            if (!topic) {
              topic = {
                topic_id: row.topic_id,
                topic_title: row.topic_title,
                topic_chapter: row.topic_chapter_id,
                goal: row.topic_goal,
                created_at: row.topic_created_at,
                updated_at: row.topic_updated_at,
                files: [],
              };
              chapter.topics.push(topic);
            }

            if (row.file_id) {
              const existingFile = topic.files.find(
                (file) => file.file_id === row.file_id
              );
              if (!existingFile) {
                topic.files.push({
                  file_id: row.file_id,
                  title: row.file_title,
                  link_file: row.file_link,
                  video: row.file_video,
                });
              }
            }
          }

          return acc;
        }, []);

        // Konversi Set class_names menjadi array string
        structuredData.forEach((chapter) => {
          chapter.class_names = Array.from(chapter.class_names);
          chapter.class_codes = Array.from(chapter.class_codes);
        });

        res.status(200).json(structuredData);
      } else {
        return res.status(404).json({ message: "Data not found" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }
);

router.get("/chapter/:id", authorize("teacher"), async (req, res) => {
  try {
    const data = await client.query(
      `SELECT * FROM lms_chapters WHERE id = $1`,
      [req.params.id]
    );

    if (data.rowCount > 0) {
      const chapter = data.rows[0];

      res.status(200).json(chapter);
    } else {
      return res.status(404).json({ message: "Data not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/delete-chapter/:id", authorize("teacher"), async (req, res) => {
  try {
    await client.query(`DELETE FROM lms_chapters WHERE id = $1`, [
      req.params.id,
    ]);

    res.status(200).json({ message: "Berhasil dihapus" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Menampilakan chapter berdasarkan kelas
router.get("/get-chapter-for-class", authorize("student"), async (req, res) => {
  try {
    // Retrieve the class_code of the student
    const student = await client.query(
      `SELECT class_code FROM students_class WHERE nis = $1`,
      [req.user.nis]
    );

    if (student.rows.length === 0) {
      return res.status(404).json({ message: "Student not found." });
    }

    const classCode = student.rows[0].class_code;

    const data = await client.query(
      `SELECT * FROM lms_chapters WHERE $1 = ANY(class_code)
        ORDER BY created_at ASC`,
      [classCode]
    );

    const chapters = data.rows;

    res.status(200).json(chapters);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Topics
router.post(
  "/add-topic",
  authorize("teacher"),
  // Allow multiple files with a limit of 10
  async (req, res) => {
    try {
      const { id, chapter_id, title, goal, subject_code } = req.body;

      console.log(req.body);

      let topicId = id;

      // Jika `id` tidak disediakan, tambahkan topik baru dan ambil ID-nya
      if (!topicId) {
        const result = await client.query(
          `INSERT INTO lms_topics (chapter_id, title, goal, subject_code) VALUES ($1, $2, $3, $4) RETURNING id`,
          [chapter_id, title, goal, subject_code]
        );
        topicId = result.rows[0].id; // ID topik baru
      } else {
        // Jika `id` disediakan, perbarui data topik
        await client.query(
          `UPDATE lms_topics SET chapter_id = $1, title = $2, goal = $3, subject_code = $4 WHERE id = $5`,
          [chapter_id, title, goal, subject_code, topicId]
        );
      }

      return res
        .status(200)
        .json({ message: id ? "Berhasil diperbarui" : "Berhasil disimpan" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }
);

router.get(
  "/topics/:chapter_id",
  authorize("teacher", "student"),
  async (req, res) => {
    try {
      const data = await client.query(
        `SELECT * FROM lms_topics WHERE chapter_id = $1
        ORDER BY created_at ASC`,
        [req.params.chapter_id]
      );

      res.status(200).json(data.rows);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

router.get("/topic/:id", authorize("teacher"), async (req, res) => {
  try {
    const data = await client.query(`SELECT * FROM lms_topics WHERE id = $1`, [
      req.params.id,
    ]);

    res.status(200).json(data.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/delete-topic/:id", authorize("teacher"), async (req, res) => {
  try {
    await client.query(`DELETE FROM lms_topics WHERE id = $1`, [req.params.id]);
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Upload file
// Multer storage configuration
router.post(
  "/upload-file",
  authorize("teacher"),
  uploadFile.single("file"),
  async (req, res) => {
    try {
      const { subject_code, topic_id, url, title } = req.body;
      const username = req.user.name.replace(/\s+/g, "_").toLowerCase();
      const userFolder = `${username}`;

      // Check if a file was uploaded
      if (req.file) {
        const fileLink =
          process.env.SERVER_2 +
          `/upload/lms/${userFolder}/` +
          req.file.filename;

        await client.query(
          `INSERT INTO lms_files (subject_code, topic_id, link_file, title)
          VALUES ($1, $2, $3, $4)`,
          [subject_code, topic_id, fileLink, title]
        );

        return res.status(200).json({ message: "Berhasil disimpan" });
      }

      // If only a URL is provided, insert URL
      if (url) {
        await client.query(
          `INSERT INTO lms_files (subject_code, topic_id, video, title)
          VALUES ($1, $2, $3, $4)`,
          [subject_code, topic_id, url, title]
        );

        return res.status(200).json({ message: "Berhasil disimpan" });
      }

      return res.status(400).json({ message: "No file or URL provided" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }
);

router.get(
  "/get-files/:topic_id",
  authorize("teacher", "student"),
  async (req, res) => {
    try {
      const id = req.params.topic_id;

      const data = await client.query(
        `SELECT * FROM lms_files WHERE topic_id = $1`,
        [id]
      );

      const files = data.rows;

      res.status(200).json(files);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

router.delete("/delete-file/:id", authorize("teacher"), async (req, res) => {
  try {
    const { id } = req.params;

    // Retrieve the file link from the database
    const result = await client.query(
      "SELECT link_file FROM lms_files WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "File not found" });
    }

    const fileLink = result.rows[0].link_file;
    const serverUrl = process.env.SERVER_2;

    // Check if the file is hosted on the server (not a URL like YouTube)
    if (fileLink && fileLink.startsWith(serverUrl)) {
      const filePath = fileLink.replace(serverUrl, ".");

      // Check if the file exists and delete it
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) {
            return res.status(500).json({ message: "Failed to delete file" });
          }
        });
      }

      await client.query("DELETE FROM lms_files WHERE id = $1", [id]);
    } else {
      await client.query("DELETE FROM lms_files WHERE id = $1", [id]);
    }

    // Delete the file record from the database

    res.status(200).json({ message: "Berhasil dihapus" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

export default router;
