import express from "express";
import { client } from "../connection/connection.js";
import {
  authenticatedUser,
  authorizeRoles,
} from "../middleware/authenticate.js";

const router = express.Router();

// Menampilkan mapel
router.get(
  "/get",
  authenticatedUser,
  authorizeRoles("admin", "teacher"),
  async (req, res) => {
    try {
      const role = req.user.role;

      if (role === "admin") {
        const homebase = req.user.homebase_id;

        const data = await client.query(
          "SELECT subjects.id, subjects.name, homebase.name AS homebase, subjects.code FROM subjects " +
            "INNER JOIN homebase ON subjects.homebase_id = homebase.id " +
            "WHERE subjects.homebase_id = $1 " +
            "ORDER BY subjects.name ASC",
          [homebase]
        );

        const subejcts = data.rows;

        res.status(200).json(subejcts);
      } else {
        const data = await client.query(
          `SELECT * FROM teachers WHERE id = $1`,
          [req.user.id]
        );

        const teacher = data.rows[0];
        const subjectCodes = teacher.subject_code;

        // Query to fetch subjects based on the subject_code array
        const subjectData = await client.query(
          `SELECT code, name FROM subjects WHERE code = ANY($1::int[])`,
          [subjectCodes]
        );

        const subjects = subjectData.rows;

        // Count chapters and topics for each subject for teacher
        const subjectsWithCounts = await Promise.all(
          subjects.map(async (subject) => {
            // Count chapters for each subject
            const { rows: chapterCount } = await client.query(
              `SELECT COUNT(*) FROM lms_chapters WHERE subject_code = $1`,
              [subject.code]
            );

            // Count topics for each subject
            const { rows: topicCount } = await client.query(
              `SELECT COUNT(*) FROM lms_topics WHERE subject_code = $1`,
              [subject.code]
            );

            return {
              ...subject,
              chapter_count: parseInt(chapterCount[0].count, 10),
              topic_count: parseInt(topicCount[0].count, 10),
            };
          })
        );

        res.status(200).json(subjectsWithCounts);
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

// Menambahkan mapel
router.post(
  "/create",
  authenticatedUser,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const homebase = req.user.homebase_id;

      const checking = await client.query(
        "SELECT * FROM subjects WHERE homebase_id = $1 AND code = $2",
        [homebase, req.body.code]
      );

      if (checking.rowCount > 0) {
        return res.status(400).json({ message: "Code has been used" });
      } else {
        const data = await client.query(
          "INSERT INTO subjects(name, homebase_id, code) VALUES($1, $2, $3) RETURNING *",
          [req.body.subject, homebase, req.body.code]
        );

        const newSubject = data.rows[0];

        res.status(200).json({
          message: "Subject is successfully added",
          newSubject,
        });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// Upload mapel
router.post(
  "/upload",
  authenticatedUser,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const { data } = req.body;
      const homebase = req.user.homebase_id;

      const subjects = data.filter(
        (item) => item[0] !== null && item[0] !== undefined
      );

      let addedCount = 0;

      await Promise.all(
        subjects.map(async (item) => {
          const [code, subject] = item;
          const checking = await client.query(
            "SELECT * FROM subjects WHERE homebase_id = $1 AND code = $2",
            [homebase, code]
          );

          if (checking.rowCount === 0) {
            await client.query(
              "INSERT INTO subjects (homebase_id, code, name) VALUES ($1, $2, $3)",
              [homebase, code, subject]
            );
            addedCount++;
          }
        })
      );

      res.status(200).json({
        message: `${addedCount} subjects successfully added`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
);

// Detail mapel
router.get(
  "/detail/:id",
  authenticatedUser,
  authorizeRoles("admin", "teacher"),
  async (req, res) => {
    try {
      const subject = await client.query(
        "SELECT * FROM subjects WHERE id = $1",
        [req.params.id]
      );

      if (!subject) {
        return res.status(404).json({ message: "Subject not found" });
      }

      res.status(200).json(subject.rows[0]);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }
);

// Memperbarui mapel
router.put(
  "/update/:id",
  authenticatedUser,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const homebase = req.user.homebase_id;

      const subject = await client.query(
        "SELECT * FROM subjects WHERE id = $1",
        [req.params.id]
      );

      if (!subject) {
        return res.status(404).json({ message: "Subject not found" });
      }

      await client.query(
        "UPDATE mapel SET homebase_id = $1, name = $2, code = $3 WHERE id = $3 RETURNING *",
        [homebase, req.body.subject, req.body.code, req.params.id]
      );

      res.status(200).json({ message: "Subject is successfully updated" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// Menghapus mapel
router.delete(
  "/delete/:id",
  authenticatedUser,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      await client.query("DELETE FROM subjects WHERE id = $1", [req.params.id]);

      res.status(200).json({ message: "Subject is successfully deleted" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }
);

// Menghapus semua mapel
router.delete(
  "/delete-data",
  authenticatedUser,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const homebase = req.user.homebase_id;

      await client.query("DELETE FROM subjects WHERE homebase_id = $1", [
        homebase,
      ]);

      res.status(200).json({ message: `Subjects are successfully deleted` });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// Menampilkan mapel berdasarkan kelas yang ditentukan guru
router.get(
  "/get-for-class",
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

      const classCode = student.rows[0].class_code; // Get the class_code from the student's record

      // Query to get teachers who have this class_code assigned in their subject_classes
      const { rows: teacherRows } = await client.query(
        `SELECT id, name, subject_classes
         FROM teachers
         WHERE EXISTS (
           SELECT 1
           FROM jsonb_each(subject_classes) AS subj(subject_id, class_list)
           WHERE class_list @> to_jsonb($1::int)  -- Convert classCode to integer
         )`,
        [classCode] // Pass the classCode to check within subject_classes
      );

      if (teacherRows.length === 0) {
        return res
          .status(404)
          .json({ message: "No subjects found for the given class code." });
      }

      // Get subject data from subjects table for the subjectCodes found
      const subjectCodes = new Set();
      teacherRows.forEach((teacher) => {
        const subjectClasses = teacher.subject_classes;

        // Get the subjectCodes where the classCode is present
        Object.entries(subjectClasses).forEach(([subjectCode, classList]) => {
          if (classList.includes(classCode)) {
            subjectCodes.add(subjectCode); // Add subjectCode to the set
          }
        });
      });

      // Query the subjects table to get the subjects' details
      const { rows: subjects } = await client.query(
        `SELECT id, name, code FROM subjects WHERE code = ANY($1::int[])`,
        [Array.from(subjectCodes)] // Pass the subjectCodes as an array
      );

      if (subjects.length === 0) {
        return res
          .status(404)
          .json({ message: "No subjects found for the given class code." });
      }

      const subjectsWithCounts = await Promise.all(
        subjects.map(async (subject) => {
          // Count chapters for each subject
          const { rows: chapterCount } = await client.query(
            `SELECT COUNT(*) FROM lms_chapters WHERE subject_code = $1`,
            [subject.code]
          );

          // Count topics for each subject
          const { rows: topicCount } = await client.query(
            `SELECT COUNT(*) FROM lms_topics WHERE subject_code = $1`,
            [subject.code]
          );

          return {
            ...subject,
            chapter_count: parseInt(chapterCount[0].count, 10), // Add the chapter count to the subject
            topic_count: parseInt(topicCount[0].count, 10), // Add the topic count to the subject
          };
        })
      );

      // Respond with the subjects and their chapter and topic counts
      res.status(200).json(subjectsWithCounts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
);

export default router;
