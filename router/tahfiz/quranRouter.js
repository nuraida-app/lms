import express from "express";
import { authorize } from "../../middleware/authenticate.js";
import { client } from "../../connection/connection.js";

const router = express.Router();

router.post("/add-surah", authorize("tahfiz"), async (req, res) => {
  try {
    const { id, name, count } = req.body;

    if (id) {
      await client.query(
        `UPDATE t_alquran
      SET surah = $1, ayat = $2 WHERE id = $3`,
        [name, count, id]
      );
    } else {
      await client.query(
        `INSERT INTO t_alquran (surah, ayat) VALUES ($1, $2)`,
        [name, count]
      );
    }

    const update = "Berhasil diperbarui";
    const create = "Berhasil disimpan";

    res.status(201).json({ message: id ? update : create });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/get-alquran", authorize("tahfiz"), async (req, res) => {
  try {
    const { page, limit, search = "" } = req.query;

    if (!page && !limit) {
      // Jika page dan limit tidak ada, tampilkan semua data
      const querySearch = `
                SELECT * 
                FROM t_alquran
                WHERE surah ILIKE $1
                ORDER BY id
            `;

      const data = await client.query(querySearch, [`%${search}%`]);

      return res.status(200).json(data.rows);
    }

    // Jika page dan limit disediakan, gunakan pagination
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 20;
    const offset = (pageNumber - 1) * limitNumber;

    const querySearch = `
                SELECT * 
                FROM t_alquran
                WHERE surah ILIKE $1
                ORDER BY id
                LIMIT $2 OFFSET $3
            `;
    const queryTotalData = `
                SELECT COUNT(*) as total_surah
                FROM t_alquran
                WHERE surah ILIKE $1
            `;
    const queryTotalAyat = `
                SELECT SUM(ayat) as total_ayat
                FROM t_alquran
            `;

    const [data, totalData, totalAyat] = await Promise.all([
      client.query(querySearch, [`%${search}%`, limitNumber, offset]),
      client.query(queryTotalData, [`%${search}%`]),
      client.query(queryTotalAyat),
    ]);

    return res.status(200).json({
      surah: data.rows,
      totalPages: Math.ceil(totalData.rows[0].total_surah / limitNumber),
      totalSurah: parseInt(totalData.rows[0].total_surah),
      totalAyat: parseInt(totalAyat.rows[0].total_ayat),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete-surah/:id", authorize("tahfiz"), async (req, res) => {
  try {
    await client.query("DELETE FROM t_alquran WHERE id = $1", [req.params.id]);

    res.status(200).json({ message: "Berhasil dihapus" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
