import express from "express";
import { client } from "../../connection/connection.js";
import bcrypt from "bcrypt";
import { authorize } from "../../middleware/authenticate.js";

const router = express.Router();

// Mendaftartkan admin
// super admin
router.post("/create", authorize("admin", "super-admin"), async (req, res) => {
  try {
    const { name, email, password, homebase_id, role } = req.body;

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
          return res
            .status(200)
            .json({ message: "Admin berhasil ditambahkan", admin });
        } else {
          return res.status(500).json({ message: "Gagal ditambahkan" });
        }
      }
    });
  } catch (error) {
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

router.get(
  "/admin/:id",
  authorize("admin", "super-admin"),
  async (req, res) => {
    try {
      const data = await client.query(
        "SELECT * FROM user_admin where id = $1",
        [req.params.id]
      );

      res.status(200).json(data.rows[0]);
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

router.put("/update", authorize("admin", "super-admin"), async (req, res) => {
  try {
    const { name, email, role, homebase_id, password, id } = req.body;

    if (password) {
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        } else {
          await client.query(
            `UPDATE user_admin SET name = $1, email = $2, password = $3,
              role = $4, homebase_id = $5 WHERE id = $6`,
            [name, email, hash, role, homebase_id, id]
          );

          res.status(200).json({ message: "Updated successfully" });
        }
      });
    } else {
      await client.query(
        `UPDATE user_admin SET name = $1, email = $2,
              role = $3, homebase_id = $4 WHERE id = $5`,
        [name, email, role, homebase_id, id]
      );

      res.status(200).json({ message: "Updated successfully" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get("/profile", authorize("admin", "super-admin"), async (req, res) => {
  try {
    const user = req.user;

    if (user.role === "admin") {
      const data = await client.query(
        "SELECT user_admin.id, user_admin.name, user_admin.role, homebase.name FROM user_admin " +
          "INNER JOIN homebase ON homebase.id = user_admin.homebase_id " +
          "WHERE user_admin.id = $1",
        [user.id]
      );
      const adminData = data.rows[0];

      res.status(200).json(adminData);
    } else {
      const data = await client.query(
        "SELECT user_admin.id, user_admin.name, user_admin.role, user_admin.email FROM user_admin " +
          "WHERE user_admin.id = $1",
        [user.id]
      );
      const adminData = data.rows[0];

      res.status(200).json(adminData);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

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
      `SELECT * FROM user_teacher WHERE homebase_id = $1`,
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
    return res.status(500).json({ error: error.message });
  }
});

export default router;
