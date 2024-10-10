import express from "express";
import { client } from "../connection/connection.js";
import {
  authenticatedUser,
  authorizeRoles,
} from "../middleware/authenticate.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// Chapters
router.post(
  "/add-chapter",
  authenticatedUser,
  authorizeRoles("teacher"),
  async (req, res) => {
    try {
      const { id, code, title, selectedClasses, goal } = req.body;

      const data = await client.query(
        `SELECT * FROM lms_chapters WHERE id = $1`,
        [id]
      );

      if (data.rowCount > 0) {
        await client.query(
          `UPDATE lms_chapters SET title = $1, class_code = $2, goal = $3
        WHERE id = $4`,
          [title, selectedClasses, goal, id]
        );

        return res.status(200).json({ message: "Updated" });
      } else {
        await client.query(
          `INSERT INTO lms_chapters (subject_code, title, class_code, goal)
          VALUES ($1, $2, $3, $4)`,
          [code, title, selectedClasses, goal]
        );

        return res.status(200).json({ message: "Saved" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

router.get(
  "/chapters/:code",
  authenticatedUser,
  authorizeRoles("teacher"),
  async (req, res) => {
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
  }
);

router.get(
  "/chapter/:id",
  authenticatedUser,
  authorizeRoles("teacher"),
  async (req, res) => {
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
  }
);

router.delete(
  "/delete-chapter/:id",
  authenticatedUser,
  authorizeRoles("teacher"),
  async (req, res) => {
    try {
      await client.query(`DELETE FROM lms_chapters WHERE id = $1`, [
        req.params.id,
      ]);

      res.status(200).json({ message: "Deleted" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// Menampilakan chapter berdasarkan kelas
router.get(
  "/get-chapter-for-class",
  authenticatedUser,
  authorizeRoles("student"),
  async (req, res) => {
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
  }
);

// Topics
router.post(
  "/add-topic",
  authenticatedUser,
  authorizeRoles("teacher"),
  async (req, res) => {
    try {
      const { id, chapter_id, title, goal, subject_code } = req.body;

      const data = await client.query(
        `SELECT * FROM lms_topics WHERE id = $1`,
        [id]
      );

      if (data.rowCount > 0) {
        await client.query(
          `UPDATE lms_topics SET chapter_id = $1, title = $2, goal = $3,
          subject_code = $4
        WHERE id = $5`,
          [chapter_id, title, goal, subject_code, id]
        );

        return res.status(200).json({ message: "Updated" });
      } else {
        await client.query(
          `INSERT INTO lms_topics (chapter_id, title, goal, subject_code)
          VALUES ($1, $2, $3, $4)`,
          [chapter_id, title, goal, subject_code]
        );
        return res.status(200).json({ message: "Saved" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

router.get(
  "/topics/:chapter_id",
  authenticatedUser,
  authorizeRoles("teacher", "student"),
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

router.get(
  "/topic/:id",
  authenticatedUser,
  authorizeRoles("teacher"),
  async (req, res) => {
    try {
      const data = await client.query(
        `SELECT * FROM lms_topics WHERE id = $1`,
        [req.params.id]
      );

      res.status(200).json(data.rows[0]);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

router.delete(
  "/delete-topic/:id",
  authenticatedUser,
  authorizeRoles("teacher"),
  async (req, res) => {
    try {
      await client.query(`DELETE FROM lms_topics WHERE id = $1`, [
        req.params.id,
      ]);
      res.status(200).json({ message: "Deleted" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// Upload file
// Multer storage configuration
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

router.post(
  "/upload-file",
  authenticatedUser,
  authorizeRoles("teacher"),
  uploadFile.single("file"),
  async (req, res) => {
    try {
      const { subject_code, topic_id, type, url, title } = req.body;
      const username = req.user.name.replace(/\s+/g, "_").toLowerCase();
      const userFolder = `${username}`;

      // Check if a file was uploaded
      if (req.file) {
        const fileLink =
          process.env.SERVER_2 +
          `/upload/lms/${userFolder}/` +
          req.file.filename;

        await client.query(
          `INSERT INTO lms_files (subject_code, topic_id, type_file, link_file, title)
          VALUES ($1, $2, $3, $4, $5)`,
          [subject_code, topic_id, type, fileLink, title]
        );

        return res.status(200).json({ message: "Uploaded" });
      }

      // If only a URL is provided, insert URL
      if (url) {
        const video = "youtube";
        await client.query(
          `INSERT INTO lms_files (subject_code, topic_id, type_file, link_file, title)
          VALUES ($1, $2, $3, $4, $5)`,
          [subject_code, topic_id, video, url, title]
        );

        return res.status(200).json({ message: "URL Uploaded Successfully" });
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
  authenticatedUser,
  authorizeRoles("teacher", "student"),
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

router.delete(
  "/delete-file/:id",
  authenticatedUser,
  authorizeRoles("teacher"),
  async (req, res) => {
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
  }
);

export default router;
