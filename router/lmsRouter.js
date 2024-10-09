import express from "express";
import { client } from "../connection/connection.js";
import {
  authenticatedUser,
  authorizeRoles,
} from "../middleware/authenticate.js";

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

export default router;
