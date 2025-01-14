import express from "express";
import { client } from "../../connection/connection.js";
import {
  authenticatedUser,
  authorizeRoles,
  authorize,
} from "../../middleware/authenticate.js";

const router = express.Router();

// Membuat tingkat
router.post("/create", authorize("admin", "super-admin"), async (req, res) => {
  try {
    const homebase = req.user.homebase_id;

    const checking = await client.query(
      "SELECT * FROM grades WHERE grade = $1",
      [req.body.grade]
    );

    if (checking.rowCount > 0) {
      res.status(500).json({ message: "Grade has been used" });
    } else {
      await client.query(
        "INSERT INTO grades(grade, homebase_id) VALUES($1, $2) RETURNING *",
        [req.body.grade, homebase]
      );

      res.status(200).json({ message: "Berhasil ditambahkan" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Menampilkan tingkat
router.get(
  "/get",
  authorize("admin", "teacher", "super-admin"),
  async (req, res) => {
    try {
      const homebase = req.user.homebase_id;

      if (req.user.id === 158) {
        const data = await client.query(
          "SELECT grades.id, grades.grade, homebase.name AS homebase FROM grades " +
            "INNER JOIN homebase ON grades.homebase_id = homebase.id " +
            "ORDER BY CAST(grades.grade AS INTEGER) ASC"
        );

        const grades = data.rows;

        res.status(200).json(grades);
      } else {
        const data = await client.query(
          "SELECT grades.id, grades.grade, homebase.name AS homebase FROM grades " +
            "INNER JOIN homebase ON grades.homebase_id = homebase.id " +
            "WHERE homebase_id = $1 " +
            "ORDER BY CAST(grades.grade AS INTEGER) ASC",
          [homebase]
        );

        const grades = data.rows;

        res.status(200).json(grades);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }
);

// Menghapus tingkat
router.delete("/delete/:id", authorize("admin"), async (req, res) => {
  try {
    await client.query("DELETE FROM grades WHERE id = $1", [req.params.id]);

    res.status(200).json({ message: "Berhasil dihapus" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete(
  "/clear-data",
  authenticatedUser,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      await client.query("DELETE FROM grades WHERE homebase_id = $1", [
        req.user.homebase_id,
      ]);

      res.status(200).json({ message: "Database berhasil dihapus" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

export default router;
