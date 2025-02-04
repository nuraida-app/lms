import express from "express";
import { client } from "../../connection/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authorize } from "../../middleware/authenticate.js";

const router = express.Router();

router.post("/super-admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await client.query(
      "SELECT * FROM user_admin WHERE email = $1",
      [email]
    );

    const user = data.rows[0];

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!result) {
        return res.status(401).json({ message: "Password salah" });
      }

      const token = jwt.sign(
        { id: user.id, type: user.role },
        process.env.JWT,
        {
          expiresIn: "8h",
        }
      );

      res.cookie("token", token, { httpOnly: true, maxAge: 28800000 });
      res.status(200).json(user);
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, password, nis } = req.body;

    const check = await client.query(
      `SELECT * FROM user_student WHERE nis = $1`,
      [nis]
    );

    if (check.rowCount === 0) {
      return res.status(404).json({ message: "Nis tidak ditemukan" });
    }

    const hash = await bcrypt.hash(password, 10);
    const role = "parent";
    const data = await client.query(
      `INSERT INTO 
    user_parent (nis, email, username, password, role, phone) 
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [nis, email, name, hash, role, phone]
    );

    const user = data.rows[0];

    const token = jwt.sign({ id: user.id, type: user.role }, process.env.JWT, {
      expiresIn: "8h",
    });

    return res
      .status(200)
      .cookie("token", token, { httpOnly: true, maxAge: 43200000 }) // 12 jam
      .json({ message: "Pendaftaran Berhasil" });
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { nis, nip, email, password, username } = req.body;
    let query;

    if (nis) {
      query = {
        text: "SELECT * FROM user_student WHERE nis = $1",
        values: [nis],
      };
    } else if (nip) {
      query = {
        text: "SELECT * FROM user_teacher WHERE nip = $1",
        values: [nip],
      };
    } else if (email) {
      query = {
        text: "SELECT * FROM user_admin WHERE email = $1",
        values: [email],
      };
    } else if (username) {
      query = {
        text: "SELECT * FROM user_parent WHERE email = $1",
        values: [username],
      };
    } else {
      return res.status(400).json({ message: "Kredensial tidak valid" });
    }

    const data = await client.query(query);
    if (data.rowCount === 0) {
      return res.status(401).json({ message: "User tidak ditemukan" });
    }

    const user = data.rows[0];
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!result) {
        return res.status(401).json({ message: "Password salah" });
      }

      const token = jwt.sign(
        { id: user.id, type: user.role },
        process.env.JWT,
        {
          expiresIn: "8h",
        }
      );

      res.cookie("token", token, { httpOnly: true, maxAge: 28800000 });
      res.status(200).json(user);
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/logout", (req, res) => {
  try {
    // Hapus cookie dengan token
    res.cookie("token", "", {
      httpOnly: true, // Membatasi akses cookie hanya melalui HTTP (tidak tersedia di JavaScript)

      expires: new Date(0), // Mengatur waktu kedaluwarsa ke waktu lampau
    });

    return res.status(200).json({ message: "Berhasil keluar" });
  } catch (error) {
    console.error("Kesalahan saat logout:", error);
    return res.status(500).json({ message: "Terjadi kesalahan saat logout" });
  }
});

router.get(
  "/load",
  authorize("admin", "student", "teacher", "parent", "super-admin", "tahfiz"),
  async (req, res) => {
    try {
      // Extract token from cookies
      const token = req.cookies.token;

      if (!token) {
        return res
          .status(401)
          .json({ message: "Token tidak ditemukan, login kembali." });
      }

      // Verify token
      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT);
      } catch (err) {
        return res
          .status(401)
          .json({ message: "Token kadaluarsa, login kembali." });
      }

      const { role, id } = req.user;

      // Query data based on user role

      if (role === "tahfiz") {
        const query = `
          SELECT *
          FROM user_admin 
          WHERE id = $1
        `;
        const result = await client.query(query, [id]);
        const tahfiz = result.rows[0];

        return res.status(200).json(tahfiz);
      }

      if (role === "super-admin") {
        const query = `
          SELECT *
          FROM user_admin 
          WHERE id = $1
        `;
        const result = await client.query(query, [id]);
        const superAdmin = result.rows[0];

        return res.status(200).json(superAdmin);
      }

      if (role === "admin") {
        const query = `
          SELECT user_admin.name, user_admin.role, homebase.name AS homebase, user_admin.homebase_id 
          FROM user_admin 
          INNER JOIN homebase ON homebase.id = user_admin.homebase_id 
          WHERE user_admin.id = $1
        `;
        const result = await client.query(query, [id]);
        const adminData = result.rows[0];

        return res.status(200).json(adminData);
      }

      if (role === "student") {
        const studentQuery = `
          SELECT user_student.name, user_student.role, user_student.nis 
          FROM user_student 
          WHERE user_student.id = $1
        `;
        const studentResult = await client.query(studentQuery, [id]);
        const studentData = studentResult.rows[0];

        if (!studentData) {
          return res
            .status(404)
            .json({ message: "Data siswa tidak ditemukan." });
        }

        const detailQuery = `
          SELECT students_class.grade_id, grades.grade, classes.name AS class,
                 students_class.class_code, homebase.name AS homebase
          FROM students_class 
          INNER JOIN grades ON students_class.grade_id = grades.id
          INNER JOIN classes ON students_class.class_code = classes.code
          INNER JOIN homebase ON students_class.homebase_id = homebase.id
          WHERE students_class.nis = $1
        `;
        const detailResult = await client.query(detailQuery, [studentData.nis]);
        const detailData = detailResult.rows[0];

        const student = {
          name: studentData.name,
          nis: studentData.nis,
          homebase: detailData.homebase,
          grade_id: detailData.grade_id,
          grade: detailData.grade,
          class: detailData.class,
          class_code: detailData.class_code,
          role: studentData.role,
        };

        return res.status(200).json(student);
      }

      if (role === "teacher") {
        const teacherQuery = `
          SELECT 
            user_teacher.id, user_teacher.role, user_teacher.nip, 
            user_teacher.name, user_teacher.email, user_teacher.subject_code, 
            ARRAY_AGG(DISTINCT jsonb_build_object('id', homebase.id, 'name', homebase.name)) AS homebase, 
            user_teacher.homeroom, classes.name AS class, user_teacher.class_code, 
            user_teacher.subject_classes, ARRAY_AGG(DISTINCT subjects.name) AS subjects
          FROM 
            user_teacher 
          LEFT JOIN 
            homebase ON homebase.id = ANY(user_teacher.homebase_id) 
          LEFT JOIN 
            classes ON classes.code = user_teacher.class_code 
          LEFT JOIN 
            subjects ON subjects.code = ANY(user_teacher.subject_code) 
          WHERE 
            user_teacher.id = $1 
          GROUP BY 
            user_teacher.id, user_teacher.nip, user_teacher.name, 
            user_teacher.email, user_teacher.homeroom, 
            classes.name, user_teacher.class_code
        `;
        const teacherResult = await client.query(teacherQuery, [id]);
        const teacherData = teacherResult.rows[0];

        if (!teacherData) {
          return res
            .status(404)
            .json({ message: "Data guru tidak ditemukan." });
        }

        return res.status(200).json(teacherData);
      }

      if (role === "parent") {
        const parentQuery = `
          SELECT user_parent.username,
          user_parent.role, user_parent.nis,
          user_parent.phone , user_parent.email
          FROM user_parent 
          WHERE user_parent.id = $1
        `;
        const parentResult = await client.query(parentQuery, [id]);
        const parentData = parentResult.rows[0];

        if (!parentData) {
          return res.status(404).json({ message: "Data tidak ditemukan" });
        }

        const studentQuery = `
          SELECT user_student.name, user_student.role, user_student.nis 
          FROM user_student 
          WHERE user_student.nis = $1
        `;
        const studentResult = await client.query(studentQuery, [
          parentData.nis,
        ]);
        const studentData = studentResult.rows[0];

        const detailQuery = `
          SELECT students_class.grade_id, grades.grade, classes.name AS class,
                 students_class.class_code, homebase.name AS homebase
          FROM students_class 
          INNER JOIN grades ON students_class.grade_id = grades.id
          INNER JOIN classes ON students_class.class_code = classes.code
          INNER JOIN homebase ON students_class.homebase_id = homebase.id
          WHERE students_class.nis = $1
        `;
        const detailResult = await client.query(detailQuery, [studentData.nis]);
        const detailData = detailResult.rows[0];

        const student = {
          name: parentData.username,
          email: parentData.email,
          phone: parentData.phone,
          student: studentData.name,
          nis: parentData.nis,
          homebase: detailData.homebase,
          grade_id: detailData.grade_id,
          grade: detailData.grade,
          class: detailData.class,
          class_code: detailData.class_code,
          role: parentData.role,
        };

        return res.status(200).json(student);
      }

      // Default response for unsupported roles
      return res
        .status(403)
        .json({ message: "Akses tidak diizinkan untuk peran ini." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Terjadi kesalahan pada server.",
        error: error.message,
      });
    }
  }
);

export default router;
