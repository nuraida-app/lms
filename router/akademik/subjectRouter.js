import express from "express";
import { client } from "../../connection/connection.js";
import { authorize } from "../../middleware/authenticate.js";

const router = express.Router();

// Menampilkan mapel
router.get("/get", authorize("admin", "teacher"), async (req, res) => {
  try {
    const role = req.user.role;
    let { page, limit, search } = req.query;

    if (!page && !limit && !search) {
      page = 1;
      limit = null;
      search = "";
    } else {
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 10;
      search = search || "";
    }

    const offset = limit ? (page - 1) * limit : 0;

    const getClassesFromCode = async (classCodes) => {
      const { rows: classes } = await client.query(
        `SELECT name FROM classes WHERE code  = ANY($1::int[])`,
        [classCodes]
      );
      return classes.map((cls) => cls.name);
    };

    const querySubjects = async () => {
      if (role === "admin") {
        // Admin melihat subjects berdasarkan homebase_id
        const homebaseId = req.user.homebase_id;

        return client.query(
          `SELECT subjects.id, subjects.code, subjects.name, homebase.name AS homebase_name 
           FROM subjects 
           INNER JOIN homebase ON subjects.homebase_id = homebase.id
           WHERE subjects.homebase_id = $1 AND subjects.name ILIKE $2 
           ORDER BY subjects.name ASC 
           ${limit ? "LIMIT $3 OFFSET $4" : ""}`,
          limit
            ? [homebaseId, `%${search}%`, limit, offset]
            : [homebaseId, `%${search}%`]
        );
      } else {
        // Teacher melihat subjects berdasarkan subject_code mereka
        const { rows: teacherData } = await client.query(
          `SELECT subject_code FROM user_teacher WHERE id = $1`,
          [req.user.id]
        );

        const subjectCodes = teacherData[0].subject_code;

        return client.query(
          `SELECT id, code, name FROM subjects 
           WHERE code = ANY($1::int[]) AND name ILIKE $2 
           ORDER BY name ASC 
           ${limit ? "LIMIT $3 OFFSET $4" : ""}`,
          limit
            ? [subjectCodes, `%${search}%`, limit, offset]
            : [subjectCodes, `%${search}%`]
        );
      }
    };

    const subjects = await querySubjects();

    const totalSubjectsQuery =
      role === "admin"
        ? `SELECT COUNT(*) FROM subjects WHERE homebase_id = $1 AND name ILIKE $2`
        : `SELECT COUNT(*) FROM subjects WHERE code = ANY($1::int[]) AND name ILIKE $2`;

    const totalSubjectsParams =
      role === "admin"
        ? [req.user.homebase_id, `%${search}%`]
        : [subjects.rows.map((subj) => subj.code), `%${search}%`];

    const totalSubjects = await client.query(
      totalSubjectsQuery,
      totalSubjectsParams
    );

    const total = parseInt(totalSubjects.rows[0].count, 10);
    const totalPages = limit ? Math.ceil(total / limit) : 1;

    const subjectsWithCounts = await Promise.all(
      subjects.rows.map(async (subject) => {
        const { rows: chapters } = await client.query(
          `SELECT id, grade_id, class_code FROM lms_chapters WHERE subject_code = $1`,
          [subject.code]
        );

        const levelCounts = [];
        for (const chapter of chapters) {
          const { rows: topicCount } = await client.query(
            `SELECT COUNT(*) FROM lms_topics WHERE chapter_id = $1`,
            [chapter.id]
          );

          const { rows: grade } = await client.query(
            `SELECT grade FROM grades WHERE id = $1`,
            [chapter.grade_id]
          );

          const classList = await getClassesFromCode(chapter.class_code);

          levelCounts.push({
            level: grade[0].grade,
            total_chapters: 1,
            total_topics: parseInt(topicCount[0].count, 10),
            classes: classList,
          });
        }

        // Gabungkan data per tingkat
        const groupedLevels = levelCounts.reduce((acc, curr) => {
          const existing = acc.find((lvl) => lvl.level === curr.level);
          if (existing) {
            existing.total_chapters += curr.total_chapters;
            existing.total_topics += curr.total_topics;
            existing.classes = Array.from(
              new Set([...existing.classes, ...curr.classes])
            );
          } else {
            acc.push(curr);
          }
          return acc;
        }, []);

        return {
          ...subject,
          levelCounts: groupedLevels,
        };
      })
    );

    res.status(200).json({
      subjects: subjectsWithCounts,
      totalPages,
      total,
    });
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
    const nis = req.user.nis;

    const studentClassQuery = `
      SELECT class_code
      FROM students_class
      WHERE nis = $1
    `;

    const studentClassResult = await client.query(studentClassQuery, [nis]);
    const classCodes = studentClassResult.rows.map((row) => row.class_code);

    if (classCodes.length === 0) {
      return res
        .status(404)
        .json({ message: "Student not found or no class assigned" });
    }

    // Dapatkan subjects, jumlah chapters, jumlah topics, dan nama guru berdasarkan class_code
    const subjectQuery = `
      SELECT 
        s.name AS subject_name, s.code, s.id,
        COUNT(DISTINCT c.id) AS total_chapters,
        COUNT(t.id) AS total_topics,
        COALESCE(
          STRING_AGG(DISTINCT ut.name, ', '),
          'No Teacher Assigned'
        ) AS teacher_name
      FROM subjects s
      LEFT JOIN lms_chapters c ON c.subject_code = s.code
      LEFT JOIN lms_topics t ON t.chapter_id = c.id
      LEFT JOIN user_teacher ut ON ut.subject_code && ARRAY[s.code]::integer[]
      WHERE c.class_code && $1::integer[]
      GROUP BY s.id
    `;
    const subjectResult = await client.query(subjectQuery, [classCodes]);

    res.json(subjectResult.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
