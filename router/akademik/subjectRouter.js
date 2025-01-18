import express from "express";
import { client } from "../../connection/connection.js";
import { authorize } from "../../middleware/authenticate.js";

const router = express.Router();

// Menampilkan mapel
router.get("/get", authorize("admin", "teacher"), async (req, res) => {
  try {
    const role = req.user.role;
    let { page, limit, search } = req.query;

    // Jika tidak ada page, limit, dan search dalam query
    if (!page && !limit && !search) {
      page = 1;
      limit = null; // Menandakan tidak ada limitasi
      search = ""; // Kosongkan pencarian
    } else {
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 10;
      search = search || "";
    }

    const offset = limit ? (page - 1) * limit : 0;

    if (role === "admin") {
      const homebase = req.user.homebase_id;

      // Query untuk admin dengan logika tanpa limitasi
      const query = limit
        ? `SELECT subjects.id, subjects.name, homebase.name AS homebase, subjects.code FROM subjects 
           INNER JOIN homebase ON subjects.homebase_id = homebase.id 
           WHERE subjects.homebase_id = $1 AND subjects.name ILIKE $2 
           ORDER BY subjects.name ASC 
           LIMIT $3 OFFSET $4`
        : `SELECT subjects.id, subjects.name, homebase.name AS homebase, subjects.code FROM subjects 
           INNER JOIN homebase ON subjects.homebase_id = homebase.id 
           WHERE subjects.homebase_id = $1 AND subjects.name ILIKE $2 
           ORDER BY subjects.name ASC`;

      const data = await client.query(
        query,
        limit
          ? [homebase, `%${search}%`, limit, offset]
          : [homebase, `%${search}%`]
      );

      const totalSubjects = await client.query(
        `SELECT COUNT(*) FROM subjects WHERE homebase_id = $1 AND name ILIKE $2`,
        [homebase, `%${search}%`]
      );

      const total = parseInt(totalSubjects.rows[0].count, 10);
      const totalPages = limit ? Math.ceil(total / limit) : 1;

      res.status(200).json({
        subjects: data.rows,
        totalPages,
        total,
      });
    } else {
      const data = await client.query(
        `SELECT * FROM user_teacher WHERE id = $1`,
        [req.user.id]
      );

      const teacher = data.rows[0];
      const subjectCodes = teacher.subject_code;

      const query = limit
        ? `SELECT code, name, id FROM subjects 
           WHERE code = ANY($1::int[]) AND name ILIKE $2 
           ORDER BY name ASC 
           LIMIT $3 OFFSET $4`
        : `SELECT code, name, id FROM subjects 
           WHERE code = ANY($1::int[]) AND name ILIKE $2 
           ORDER BY name ASC`;

      const subjectData = await client.query(
        query,
        limit
          ? [subjectCodes, `%${search}%`, limit, offset]
          : [subjectCodes, `%${search}%`]
      );

      const totalSubjects = await client.query(
        `SELECT COUNT(*) FROM subjects WHERE code = ANY($1::int[]) AND name ILIKE $2`,
        [subjectCodes, `%${search}%`]
      );

      const total = parseInt(totalSubjects.rows[0].count, 10);
      const totalPages = limit ? Math.ceil(total / limit) : 1;

      const subjectsWithCounts = await Promise.all(
        subjectData.rows.map(async (subject) => {
          const { rows: chapterCount } = await client.query(
            `SELECT COUNT(*) FROM lms_chapters WHERE subject_code = $1`,
            [subject.code]
          );

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

      res.status(200).json({
        subjects: subjectsWithCounts,
        totalPages,
        total,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

// Menambahkan mapel
router.post("/create", authorize("admin"), async (req, res) => {
  try {
    const { id, code, subject } = req.body;
    const homebase = req.user.homebase_id;

    if (id) {
      const existingSubject = await client.query(
        "SELECT * FROM subjects WHERE id = $1",
        [id]
      );

      if (!existingSubject.rowCount) {
        return res.status(404).json({ message: "Mapel tidak ditemukan" });
      }

      await client.query(
        "UPDATE subjects SET code = $1, name = $2 WHERE id = $3",
        [code, subject, id]
      );

      return res.status(200).json({ message: "Berhasil diperbarui" });
    }

    const duplicateCheck = await client.query(
      "SELECT * FROM subjects WHERE code = $1",
      [code]
    );

    if (duplicateCheck.rowCount > 0) {
      return res.status(400).json({ message: "Kode mapel sudah digunakan" });
    }

    await client.query(
      "INSERT INTO subjects(name, homebase_id, code) VALUES($1, $2, $3) RETURNING *",
      [subject, homebase, code]
    );

    return res.status(200).json({ message: "Berhasil ditambahkan" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
});

// Upload mapel
router.post("/upload", authorize("admin"), async (req, res) => {
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
});

// Detail mapel
router.get("/detail/:id", authorize("admin", "teacher"), async (req, res) => {
  try {
    const subject = await client.query("SELECT * FROM subjects WHERE id = $1", [
      req.params.id,
    ]);

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.status(200).json(subject.rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

// Menghapus mapel
router.delete("/delete/:code", authorize("admin"), async (req, res) => {
  try {
    const code = req.params.code;

    await client.query("DELETE FROM subjects WHERE code = $1", [code]);

    await client.query(`DELETE FROM lms_chapters WHERE subject_code = $1`, [
      code,
    ]);

    await client.query(`DELETE FROM lms_topics WHERE subject_code = $1`, [
      code,
    ]);

    await client.query(`DELETE FROM lms_files WHERE subject_code = $1`, [code]);

    res.status(200).json({ message: "Berhasil dihapus" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

// Menghapus semua mapel
router.delete("/delete-data", authorize("admin"), async (req, res) => {
  try {
    const homebase = req.user.homebase_id;

    await client.query("DELETE FROM subjects WHERE homebase_id = $1", [
      homebase,
    ]);

    res.status(200).json({ message: `Database mapel berhasil dibersihkan` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Menampilkan mapel berdasarkan kelas yang ditentukan guru
router.get("/get-for-class", authorize("student"), async (req, res) => {
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
});

export default router;
