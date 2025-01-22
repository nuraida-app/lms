import express from "express";
import { client } from "../../connection/connection.js";
import bcrypt from "bcrypt";
import { authorize } from "../../middleware/authenticate.js";

const router = express.Router();

// Mendaftartkan admin
// super admin
router.post("/create", authorize("admin", "super-admin"), async (req, res) => {
  try {
    const { name, email, password, homebase_id, role, id } = req.body;

    if (id) {
      await client.query(
        `UPDATE user_admin SET name = $1, email = $2, role = $3 
      WHERE id = $4`,
        [name, email, role, id]
      );

      res.status(200).json({ message: "Berhasil diperbarui" });
    } else {
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        } else {
          const data = await client.query(
            `INSERT INTO user_admin (name, email, password, role, homebase_id) 
            VALUES($1, $2, $3, $4, $5) RETURNING *`,
            [name, email, hash, role, homebase_id]
          );
          const admin = data.rows[0];

          if (admin) {
            return res.status(201).json({ message: "Berhasil ditambahkan" });
          } else {
            return res.status(500).json({ message: "Gagal ditambahkan" });
          }
        }
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

router.get(
  "/get-admins",
  authorize("admin", "super-admin"),
  async (req, res) => {
    try {
      const data = await client.query(
        "SELECT * FROM user_admin ORDER BY createdat ASC"
      );
      const admins = data.rows;

      res.status(200).json(admins);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

router.delete(
  "/delete/:id",
  authorize("admin", "super-admin"),
  async (req, res) => {
    try {
      await client.query(`DELETE FROM user_admin WHERE id = $1`, [
        req.params.id,
      ]);

      res.status(200).json({ message: "Deleted" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

// Admin Center data
// Dashboard
router.get(
  "/data-users",
  authorize("admin", "super-admin"),
  async (req, res) => {
    try {
      const homebase = await client.query(`SELECT * FROM homebase`);
      const classes = await client.query(`SELECT * FROM classes`);
      const teachers = await client.query(`SELECT * FROM user_teacher`);
      const students = await client.query(`SELECT * FROM user_student`);

      res.status(200).json({
        homebase: homebase.rowCount,
        classes: classes.rowCount,
        teachers: teachers.rowCount,
        students: students.rowCount,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

router.get("/data-admin", authorize("admin"), async (req, res) => {
  try {
    const teachers = await client.query(
      `SELECT * FROM user_teacher WHERE $1 = ANY(homebase_id)`,
      [req.user.homebase_id]
    );
    const students = await client.query(
      `SELECT * FROM students_class WHERE homebase_id = $1`,
      [req.user.homebase_id]
    );

    res
      .status(200)
      .json({ teachers: teachers.rowCount, students: students.rowCount });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

export default router;
