import express from "express";
import { client } from "../../connection/connection.js";
import { authorize } from "../../middleware/authenticate.js";

const router = express.Router();

// Membuat satuan
// super-admin
router.post("/create", async (req, res) => {
  try {
    const { id, name } = req.body;

    console.log(req.body);

    const checking = await client.query(
      "SELECT * FROM homebase WHERE name = $1",
      [name]
    );

    if (id) {
      await client.query(
        `UPDATE homebase SET name = $1 
          WHERE id = $2`,
        [name, id]
      );

      res.status(200).json({ message: "Berhasil diperbarui" });
    } else {
      if (checking.rowCount > 0) {
        return res.status(500).json({ message: "Nama Satuan sudah digunakan" });
      } else {
        await client.query(
          "INSERT INTO homebase(name) VALUES($1) RETURNING *",
          [name]
        );

        res.status(201).json({ message: "Berhasil disimpan" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Menampilkan satuan
router.get("/get", async (req, res) => {
  try {
    const data = await client.query("SELECT * FROM homebase ORDER BY id ASC");

    const homebases = data.rows;

    res.status(200).json(homebases);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Menghapus satuan
// super-admin
router.delete("/delete/:id", async (req, res) => {
  try {
    await client.query("DELETE FROM homebase WHERE id = $1", [req.params.id]);

    res.status(200).json({ message: "Behasil dihapus" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
