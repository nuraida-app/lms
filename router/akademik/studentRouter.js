import express from "express";
import { client } from "../../connection/connection.js";
import bcrypt from "bcrypt";
import { authorize } from "../../middleware/authenticate.js";

const router = express.Router();

// ADMIN
// Menambahkan siswa
router.post("/create", authorize("admin", "super-admin"), async (req, res) => {
  try {
    const { id, nis, name } = req.body;

    const password = "12345678";
    const role = "student";

    const userChecking = await client.query(
      "SELECT * FROM user_student WHERE nis = $1",
      [nis]
    );

    if (id) {
      await client.query(
        "UPDATE user_student SET nis = $1, name = $2 WHERE id = $3 RETURNING *",
        [nis, name, id]
      );

      res.status(200).json({ message: "Berhasil diperbarui" });
    } else {
      if (userChecking.rowCount > 0)
        return res.status(500).json({ message: "NIS sudah digunakan" });

      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }

        const insertionQuery =
          "INSERT INTO user_student (nis, name, password, role) " +
          "VALUES ($1, $2, $3, $4) RETURNING *";

        const insertionValues = [nis, name, hash, role];

        await client.query(insertionQuery, insertionValues);

        res.status(201).json({ message: "Berhasil ditambahkan" });
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Mengupload siswa
router.post("/upload", authorize("admin"), async (req, res) => {
  try {
    const data = req.body.data;

    const password = "12345678";
    const role = "student";

    // Memeriksa apakah data yang diterima memiliki nilai null untuk name
    const studentsData = data.filter(
      (item) => item[1] !== null && item[1] !== undefined
    );

    // Menggunakan Promise.all untuk menunggu semua operasi hash selesai sebelum memberikan respons
    await Promise.all(
      studentsData.map(async (student) => {
        const hash = await bcrypt.hash(password, 10);

        await client.query(
          "INSERT INTO students ( nis, name, password, role) VALUES ($1, $2, $3, $4)",
          [student[0], student[1], hash, role]
        );
      })
    );

    res.status(200).json({
      message: `${studentsData.length} students are successfully added`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

// Menampilkan seluruh siswa
router.get(
  "/get",
  authorize("admin", "teacher", "super-admin"),
  async (req, res) => {
    try {
      const {
        homebase,
        gradeId,
        classCode,
        page = 1,
        limit = 10,
        search = "",
      } = req.query;

      const offset = (page - 1) * limit;
      let query = "";
      let countQuery = "";
      let params = [];
      let countParams = [];

      if (homebase) {
        query = `
          SELECT DISTINCT ON (students_class.nis) students_class.id, students_class.nis, 
         user_student.name, homebase.name AS homebase, classes.name AS class, 
         grades.grade
  FROM students_class
  INNER JOIN user_student ON user_student.nis = students_class.nis
  INNER JOIN homebase ON homebase.id = students_class.homebase_id
  INNER JOIN grades ON grades.id = students_class.grade_id
  INNER JOIN classes ON classes.code = students_class.class_code
  LEFT JOIN db_students ON db_students.nis = students_class.nis
  WHERE students_class.homebase_id = $1 AND (
    CAST(students_class.nis AS TEXT) ILIKE $2 OR user_student.name ILIKE $2
  )
  ORDER BY students_class.nis DESC
  LIMIT $3 OFFSET $4;
        `;
        countQuery = `
          SELECT COUNT(*) AS total
          FROM students_class
          INNER JOIN user_student ON user_student.nis = students_class.nis
          WHERE students_class.homebase_id = $1 AND (
            CAST(students_class.nis AS TEXT) ILIKE $2 OR user_student.name ILIKE $2
          );
        `;
        params = [homebase, `%${search}%`, limit, offset];
        countParams = [homebase, `%${search}%`];
      } else if (gradeId) {
        query = `
          SELECT students_class.id, students_class.nis, user_student.name, grades.grade,
                 classes.name AS class
          FROM students_class
          INNER JOIN user_student ON user_student.nis = students_class.nis
          INNER JOIN grades ON grades.id = students_class.grade_id
          INNER JOIN classes ON classes.code = students_class.class_code
          WHERE students_class.grade_id = $1 AND (
            CAST(students_class.nis AS TEXT) ILIKE $2 OR user_student.name ILIKE $2
          )
          ORDER BY grades.grade ASC, classes.name ASC, user_student.name ASC
          LIMIT $3 OFFSET $4;
        `;
        countQuery = `
          SELECT COUNT(*) AS total
          FROM students_class
          INNER JOIN user_student ON user_student.nis = students_class.nis
          WHERE students_class.grade_id = $1 AND (
            CAST(students_class.nis AS TEXT) ILIKE $2 OR user_student.name ILIKE $2
          );
        `;
        params = [gradeId, `%${search}%`, limit, offset];
        countParams = [gradeId, `%${search}%`];
      } else if (classCode) {
        query = `
          SELECT DISTINCT students_class.id, students_class.nis, grades.grade, user_student.name,
                 classes.name AS class
          FROM students_class
          INNER JOIN classes ON students_class.class_code = classes.code
          INNER JOIN grades ON students_class.grade_id = grades.id
          INNER JOIN user_student ON students_class.nis = user_student.nis
          WHERE students_class.class_code = $1 AND (
            CAST(students_class.nis AS TEXT) ILIKE $2 OR user_student.name ILIKE $2
          )
          ORDER BY grades.grade ASC, classes.name ASC, user_student.name ASC
          LIMIT $3 OFFSET $4;
        `;
        countQuery = `
          SELECT COUNT(*) AS total
          FROM students_class
          INNER JOIN user_student ON user_student.nis = students_class.nis
          WHERE students_class.class_code = $1 AND (
            CAST(students_class.nis AS TEXT) ILIKE $2 OR user_student.name ILIKE $2
          );
        `;
        params = [classCode, `%${search}%`, limit, offset];
        countParams = [classCode, `%${search}%`];
      } else {
        query = `
          SELECT user_student.id, user_student.name, user_student.nis
          FROM user_student
          WHERE CAST(user_student.nis AS TEXT) ILIKE $1 OR user_student.name ILIKE $1
          ORDER BY user_student.name ASC
          LIMIT $2 OFFSET $3;
        `;
        countQuery = `
          SELECT COUNT(*) AS total
          FROM user_student
          WHERE CAST(user_student.nis AS TEXT) ILIKE $1 OR user_student.name ILIKE $1;
        `;
        params = [`%${search}%`, limit, offset];
        countParams = [`%${search}%`];
      }

      const data = await client.query(query, params);
      const countData = await client.query(countQuery, countParams);

      const students = data.rows;

      const totalStudents = parseInt(countData.rows[0].total, 10);
      const totalPages = Math.ceil(totalStudents / limit);

      return res.status(200).json({ students, totalPages, totalStudents });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }
);

// Detail siswa
router.get(
  "/detail/:id",
  authorize("admin", "siswa", "guru", "super-admin"),
  async (req, res) => {
    try {
      const { id } = req.params;

      const data = await client.query(
        "SELECT * FROM students " + "WHERE students.id = $1",
        [id]
      );

      const student = data.rows[0];

      res.status(200).json(student);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Profile
router.get("/student-profile", authorize("student"), async (req, res) => {
  try {
    const nis = req.user.nis;

    const data = await client.query(
      `SELECT * FROM db_students WHERE nis = $1`,
      [nis]
    );

    const profile = data.rows[0];

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Memperbarui siswa
router.put(
  "/update/:id",
  authorize("admin", "student", "teacher", "super-admin"),
  async (req, res) => {
    try {
      const { id } = req.params;

      const { nis, name } = req.body;

      await client.query(
        "UPDATE students SET nis = $1, name = $2 WHERE id = $3 RETURNING *",
        [nis, name, id]
      );

      res.status(200).json({
        message: "Student is updated successfully",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Menghapus siswa
router.delete(
  "/delete/:id",
  authorize("admin", "super-admin"),
  async (req, res) => {
    try {
      const id = req.params.id;

      const data = await client.query(
        "DELETE FROM user_student WHERE id = $1 RETURNING *",
        [id]
      );

      if (data.rows.length === 0) {
        return res.status(404).json({ message: "Siswa tidak ditemukan" });
      }

      res.status(200).json({ message: "Berhasil dihapus" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// ADMIN SATUAN
// Menambahkan siswa ke dalam kelas
router.post("/add-student-to-class", authorize("admin"), async (req, res) => {
  try {
    const homebase = req.user.homebase_id;
    const { nis, gradeId, code } = req.body;

    // Check if student exists in the 'students' table
    const studentCheck = await client.query(
      "SELECT * FROM user_student WHERE nis = $1",
      [nis]
    );

    if (studentCheck.rowCount === 0) {
      return res.status(404).json({ message: "NIS tidak ditemukan" });
    }

    const student = studentCheck.rows[0];

    // Check if student is already in the 'students_class' table
    const classCheck = await client.query(
      "SELECT * FROM students_class WHERE nis = $1",
      [nis]
    );

    if (classCheck.rowCount > 0) {
      return res.status(400).json({ message: "Siswa sudah berada dikelas" });
    }

    // Add student to the 'students_class' table
    await client.query(
      "INSERT INTO students_class(homebase_id, nis, grade_id, class_code) " +
        "VALUES($1, $2, $3, $4)",
      [homebase, student.nis, gradeId, code]
    );

    res.status(200).json({ message: "Berhasil ditambahkan" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

// Mengupload siswa
router.post(
  "/upload-to-class/:gradeId/:classCode",
  authorize("admin"),
  async (req, res) => {
    try {
      const homebase = req.user.homebase_id;
      const data = req.body.data;
      const { gradeId, classCode } = req.params;

      // Memeriksa apakah data yang diterima memiliki nilai null untuk name
      const studentsData = data.filter(
        (item) => item[1] !== null && item[1] !== undefined
      );

      // Memeriksa apakah semua nis ada di tabel students
      for (let i = 0; i < studentsData.length; i++) {
        const student = studentsData[i];
        const nis = student[0];
        const result = await client.query(
          "SELECT COUNT(*) FROM user_student WHERE nis = $1",
          [nis]
        );

        // Jika nis tidak ditemukan, kirim pesan kesalahan
        if (result.rows[0].count === "0") {
          return res
            .status(400)
            .json({ message: `NIS ${nis} not found in students database` });
        }
      }

      // Menggunakan Promise.all untuk menunggu semua operasi insert selesai
      await Promise.all(
        studentsData.map(async (student) => {
          await client.query(
            "INSERT INTO students_class(homebase_id, nis, grade_id, class_code) VALUES ($1, $2, $3, $4)",
            [homebase, student[0], gradeId, classCode]
          );
        })
      );

      res.status(200).json({
        message: `${studentsData.length} siswa berhasil ditambahkan`,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }
);

// Menghapus siswa dari kelas
router.delete(
  "/remove-from-class/:id",
  authorize("admin"),
  async (req, res) => {
    try {
      const id = req.params.id;

      const data = await client.query(
        "DELETE FROM students_class WHERE id = $1 RETURNING *",
        [id]
      );

      if (data.rowCount === 0) {
        return res.status(404).json({ message: "Student not found" });
      }

      res.status(200).json({
        message: "Berhasil dihapus",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.delete("/clear-class/:code", authorize("admin"), async (req, res) => {
  try {
    const code = req.params.code;

    console.log(code);

    await client.query("DELETE FROM students_class WHERE class_code = $1", [
      code,
    ]);

    res.status(200).json({
      message: "Berhasil dihapus dari kelas",
    });
  } catch (error) {}
});

// Menghapus data siswa
router.delete("/clear-data", authorize("admin"), async (req, res) => {
  try {
    const homebase = req.user.homebase_id;

    await client.query("DELETE FROM students WHERE homebase_id = $1", [
      homebase,
    ]);

    res.status(200).json({ message: "Students are successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
