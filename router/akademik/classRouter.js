import express from "express";
import { client } from "../../connection/connection.js";
import { authorize } from "../../middleware/authenticate.js";

const router = express.Router();

// Membuat kelas
router.post("/create", authorize("admin"), async (req, res) => {
  try {
    const homebase = req.user.homebase_id;
    const id = req.query.id;

    const checking = await client.query(
      "SELECT * FROM classes WHERE name = $1 AND code = $2",
      [req.body.name, req.body.code]
    );

    if (checking.rowCount > 0)
      return res.status(500).json({ message: "Class name has been used" });

    if (id) {
      await client.query(
        `UPDATE classes SET name = $1, code = $2 WHERE id = $3`,
        [req.body.name, req.body.code, id]
      );

      res.status(200).json({ message: "Berhasil diperbarui" });
    } else {
      await client.query(
        "INSERT INTO classes(name, code, homebase_id, grade_id) VALUES($1, $2, $3, $4) RETURNING *",
        [req.body.name, req.body.code, homebase, req.body.gradeId]
      );

      res.status(200).json({ message: "Berhasil ditambahkan" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Menampilkan kelas
router.get("/get", authorize("admin", "teacher"), async (req, res) => {
  try {
    const homebase = req.user.homebase_id;
    const { page, limit, search } = req.query;

    let classes = [];
    let totalCount = 0;
    let totalPages = 0;

    if (page && limit && search) {
      const offset = (page - 1) * limit;
      const querySearch = `%${search}%`;

      // Fetch total count for pagination
      const totalCountResult = await client.query(
        `SELECT COUNT(*) AS total
         FROM classes 
         INNER JOIN homebase ON homebase.id = classes.homebase_id 
         WHERE classes.homebase_id = $1 AND classes.name ILIKE $2`,
        [homebase, querySearch]
      );
      totalCount = parseInt(totalCountResult.rows[0].total, 10);
      totalPages = Math.ceil(totalCount / limit);

      // Fetch classes with pagination and search
      const data = await client.query(
        `SELECT grades.grade, classes.code, classes.grade_id, classes.name, 
                  homebase.name AS homebase, classes.id 
           FROM classes 
           INNER JOIN homebase ON homebase.id = classes.homebase_id 
           INNER JOIN grades ON grades.id = classes.grade_id 
           WHERE classes.homebase_id = $1 AND classes.name ILIKE $2 
           ORDER BY classes.createdat ASC 
           LIMIT $3 OFFSET $4`,
        [homebase, querySearch, limit, offset]
      );

      classes = data.rows;
    } else {
      // Fetch all classes without pagination or search
      const data = await client.query(
        `SELECT grades.grade, classes.code, classes.grade_id, classes.name, 
                  homebase.name AS homebase, classes.id 
           FROM classes 
           INNER JOIN homebase ON homebase.id = classes.homebase_id 
           INNER JOIN grades ON grades.id = classes.grade_id 
           WHERE classes.homebase_id = $1 
           ORDER BY classes.createdat ASC`,
        [homebase]
      );

      classes = data.rows;
      totalCount = classes.length;
      totalPages = 1;
    }

    // Fetch students count for each class based on class_code
    for (let i = 0; i < classes.length; i++) {
      const classData = classes[i];
      const studentsCount = await client.query(
        "SELECT COUNT(*) FROM students_class WHERE class_code = $1",
        [classData.code]
      );

      classes[i].students = parseInt(studentsCount.rows[0].count, 10);
    }

    res.status(200).json({
      classes,
      totalPages,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// detail kelas
router.get("/detail/:id", authorize("admin"), async (req, res) => {
  try {
    const kelas = await client.query("SELECT * FROM classes WHERE id = $1", [
      req.params.id,
    ]);

    if (!kelas) {
      return res.status(404).json({ error: "Kelas tidak ditemukan" });
    }

    res.status(200).json(kelas.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Mengedit kelas
router.put("/update/:id", authorize("admin"), async (req, res) => {
  try {
    const homebase = req.user.homebase_id;

    const classCheck = await client.query(
      "SELECT * FROM classes WHERE id = $1",
      [req.params.id]
    );

    if (classCheck.rowCount === 0) {
      return res.status(404).json({ error: "Kelas tidak ditemukan" });
    }

    const { name, gradeId, code } = req.body;

    await client.query(
      "UPDATE classes SET homebase_id = $1, grade_id = $2, code = $3, name = $4 WHERE id = $5 RETURNING *",
      [homebase, gradeId, code, name, req.params.id]
    );

    res.status(200).json({ message: "Berhasil diperbarui" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

// Menghapus kelas
router.delete("/delete/:id", authorize("admin"), async (req, res) => {
  try {
    const checking = await client.query("SELECT * FROM classes WHERE id = $1", [
      req.params.id,
    ]);

    if (checking.rowCount === 0) {
      return res.status(404).json({ message: "Kelas tidak ditemukan" });
    }

    await client.query("DELETE FROM classes WHERE id = $1", [req.params.id]);

    res.status(200).json({ message: "Berhasil dihapus" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Menghapus data kelas
router.delete("/clear-data", authorize("admin"), async (req, res) => {
  try {
    await client.query("DELETE FROM classes WHERE homebase_id = $1", [
      req.user.homebase_id,
    ]);

    res.status(200).json({ message: "Database berhasil dihapus" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
