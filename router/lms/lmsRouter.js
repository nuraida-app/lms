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

const uploadFiles = multer({ storage: fileStorage });

// Chapters
router.post("/add-chapter", authorize("teacher"), async (req, res) => {
  try {
    const { id, code, title, classIds, goal, gradeid } = req.body;

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
          `UPDATE lms_chapters SET title = $1, class_code = $2, goal = $3, grade_id = $4
          WHERE id = $5`,
          [title, classIds, goal, gradeid, id]
        );

        return res.status(200).json({ message: "Berhasil diperbarui" });
      } else {
        return res.status(404).json({ message: "Data tidak ditemukan" });
      }
    } else {
      // Jika id tidak ada, lakukan insert
      await client.query(
        `INSERT INTO lms_chapters (subject_code, title, class_code, goal, grade_id)
          VALUES ($1, $2, $3, $4, $5)`,
        [code, title, classIds, goal, gradeid]
      );

      return res.status(201).json({ message: "Berhasil disimpan" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

router.get("/chapters/:code", authorize("teacher"), async (req, res) => {
  try {
    const data = await client.query(
      `SELECT * FROM lms_chapters WHERE subject_code = $1
        ORDER BY created_at ASC`,
      [req.params.code]
    );

    if (data.rowCount > 0) {
      const chapters = data.rows;

      res.status(200).json(chapters);
    } else {
      return res.status(404).json({ message: "Data not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

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

    res.status(200).json({ message: "Deleted" });
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
  uploadFiles.array("files", 10), // Allow multiple files with a limit of 10
  async (req, res) => {
    try {
      const { id, chapter_id, title, goal, subject_code, url_files } = req.body;

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

      // Handle file uploads
      const username = req.user.name.replace(/\s+/g, "_").toLowerCase();
      const userFolder = `${username}`;

      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const fileLink =
            process.env.SERVER_2 + `/upload/lms/${userFolder}/` + file.filename;

          await client.query(
            `INSERT INTO lms_files (subject_code, topic_id, type_file, link_file, title) VALUES ($1, $2, $3, $4, $5)
             ON CONFLICT (link_file) DO UPDATE SET 
             type_file = EXCLUDED.type_file,
             title = EXCLUDED.title`,
            [subject_code, topicId, "file", fileLink, file.originalname]
          );
        }
      }

      // Handle URLs
      if (url_files) {
        const urls = Array.isArray(url_files) ? url_files : [url_files];
        for (const url of urls) {
          const video = "youtube"; // Assuming URL type is "youtube"

          await client.query(
            `INSERT INTO lms_files (subject_code, topic_id, type_file, link_file, title) VALUES ($1, $2, $3, $4, $5)
             ON CONFLICT (link_file) DO UPDATE SET 
             type_file = EXCLUDED.type_file,
             title = EXCLUDED.title`,
            [subject_code, topicId, video, url, "URL"]
          );
        }
      }

      return res.status(200).json({ message: id ? "Updated" : "Saved" });
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
    if (fileLink.startsWith(serverUrl)) {
      const filePath = fileLink.replace(serverUrl, ".");

      // Check if the file exists and delete it
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) {
            return res.status(500).json({ message: "Failed to delete file" });
          }
        });
      }
    }

    // Delete the file record from the database
    await client.query("DELETE FROM lms_files WHERE id = $1", [id]);

    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

export default router;
