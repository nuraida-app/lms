import express from "express";
import { client } from "../connection/connection.js";
import bcrypt from "bcrypt";
import {
  authenticatedUser,
  authorizeRoles,
} from "../middleware/authenticate.js";

const router = express.Router();

// Mendaftartkan admin
// super admin
router.post(
  "/create",
  authenticatedUser,
  authorizeRoles("super-admin"),
  async (req, res) => {
    try {
      const { name, email, password, homebase_id, role } = req.body;

      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        } else {
          const data = await client.query(
            "INSERT INTO admin (name, email, password, role, homebase_id) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [name, email, hash, role, homebase_id]
          );
          const admin = data.rows[0];

          if (admin) {
            return res.status(200).json({ message: "Added", admin });
          } else {
            return res.status(500).json({ message: "admin failed to add" });
          }
        }
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

router.get(
  "/get-admins",
  authenticatedUser,
  authorizeRoles("super-admin"),
  async (req, res) => {
    try {
      const data = await client.query(
        "SELECT * FROM admin ORDER BY createdat ASC"
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
  authenticatedUser,
  authorizeRoles("super-admin"),
  async (req, res) => {
    try {
      const data = await client.query("SELECT * FROM admin where id = $1", [
        req.params.id,
      ]);

      res.status(200).json(data.rows[0]);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

router.delete(
  "/delete/:id",
  authenticatedUser,
  authorizeRoles("super-admin"),
  async (req, res) => {
    try {
      await client.query(`DELETE FROM admin WHERE id = $1`, [req.params.id]);

      res.status(200).json({ message: "Deleted" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

router.put(
  "/update",
  authenticatedUser,
  authorizeRoles("super-admin"),
  async (req, res) => {
    try {
      const { name, email, role, homebase_id, password, id } = req.body;

      if (password) {
        bcrypt.hash(password, 10, async (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          } else {
            await client.query(
              `UPDATE admin SET name = $1, email = $2, password = $3,
              role = $4, homebase_id = $5 WHERE id = $6`,
              [name, email, hash, role, homebase_id, id]
            );

            res.status(200).json({ message: "Updated successfully" });
          }
        });
      } else {
        await client.query(
          `UPDATE admin SET name = $1, email = $2,
              role = $3, homebase_id = $4 WHERE id = $5`,
          [name, email, role, homebase_id, id]
        );

        res.status(200).json({ message: "Updated successfully" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

router.get(
  "/profile",
  authenticatedUser,
  authorizeRoles("admin", "super-admin"),
  async (req, res) => {
    try {
      const user = req.user;

      if (user.role === "admin") {
        const data = await client.query(
          "SELECT admin.id, admin.name, admin.role, homebase.name FROM admin " +
            "INNER JOIN homebase ON homebase.id = admin.homebase_id " +
            "WHERE admin.id = $1",
          [user.id]
        );
        const adminData = data.rows[0];

        res.status(200).json(adminData);
      } else {
        const data = await client.query(
          "SELECT admin.id, admin.name, admin.role, admin.email FROM admin " +
            "WHERE admin.id = $1",
          [user.id]
        );
        const adminData = data.rows[0];

        res.status(200).json(adminData);
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

// Admin Center data
// Dashboard
router.get(
  "/data-users",
  authenticatedUser,
  authorizeRoles("super-admin"),
  async (req, res) => {
    try {
      const homebase = await client.query(`SELECT * FROM homebase`);
      const classes = await client.query(`SELECT * FROM classes`);
      const teachers = await client.query(`SELECT * FROM Teachers`);
      const students = await client.query(`SELECT * FROM Students`);

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

export default router;
