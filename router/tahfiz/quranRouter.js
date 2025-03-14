import express from "express";
import { authorize } from "../../middleware/authenticate.js";
import { client } from "../../connection/connection.js";

const router = express.Router();
const update = "Berhasil diperbarui";
const create = "Berhasil disimpan";

router.post("/add-juz", authorize("tahfiz"), async (req, res) => {
  try {
    const { id, juz } = req.body;

    if (id) {
      await client.query(`UPDATE t_juz SET name = $1 WHERE id = $2`, [juz, id]);
    } else {
      await client.query(`INSERT INTO t_juz(name) VALUES($1) RETURNING *`, [
        juz,
      ]);
    }

    res.status(200).json({ message: id ? update : create });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/add-surah-to-juz", authorize("tahfiz"), async (req, res) => {
  try {
    const { id, juzId, surahId, fromAyat, toAyat, fromLine, toLine } = req.body;

    console.log(req.body);

    if (id) {
      await client.query(
        `UPDATE t_juzitems 
          SET juz_id = $1, surah_id = $2, 
          from_ayat = $3, to_ayat = $4,
          from_line = $5, to_line = $6 
          WHERE id = $7`,
        [juzId, surahId, fromAyat, toAyat, fromLine, toLine, id]
      );
    } else {
      await client.query(
        `INSERT INTO 
          t_juzitems(juz_id, surah_id, from_ayat, to_ayat, from_line, to_line)
          VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
        [juzId, surahId, fromAyat, toAyat, fromLine, toLine]
      );
    }

    res.status(200).json({ message: id ? update : create });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete-juz/:id", authorize("tahfiz"), async (req, res) => {
  try {
    await client.query("DELETE FROM t_juz WHERE id = $1", [req.params.id]);

    res.status(200).json({ message: "Berhasil dihapus" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/get-juz", authorize("tahfiz", "student"), async (req, res) => {
  try {
    const { page, limit, search = "" } = req.query;
    let query;
    let values = [];

    if (!page || !limit) {
      query = `SELECT t_juz.*, 
          COALESCE(
            json_agg(
              DISTINCT jsonb_build_object(
                'id', t_juzitems.id,
                'surah_id', t_alquran.id,
                'surah', t_alquran.name,
                'from_ayat', t_juzitems.from_ayat,
                'to_ayat', t_juzitems.to_ayat,
                'from_line', t_juzitems.from_line,
                'to_line', t_juzitems.to_line
              )
            ) FILTER (WHERE t_juzitems.id IS NOT NULL), '[]'
          ) AS surah,
          COALESCE((SELECT SUM(to_ayat) FROM t_juzitems WHERE t_juzitems.juz_id = t_juz.id), 0) AS total_ayat,
          COALESCE((SELECT SUM(to_line) FROM t_juzitems WHERE t_juzitems.juz_id = t_juz.id), 0) AS total_line
        FROM t_juz
        LEFT JOIN t_juzitems ON t_juz.id = t_juzitems.juz_id
        LEFT JOIN t_alquran ON t_juzitems.surah_id = t_alquran.id
        GROUP BY t_juz.id
        ORDER BY t_juz.id ASC`;
      const data = await client.query(query);
      return res.json(data.rows);
    } else {
      // Query to get total data count
      const countQuery = `
        SELECT COUNT(*) AS total FROM t_juz
        WHERE LOWER(name) LIKE LOWER($1)
      `;
      const countResult = await client.query(countQuery, [`%${search}%`]);
      const totalData = parseInt(countResult.rows[0].total);
      const totalPage = Math.ceil(totalData / parseInt(limit));

      query = `
        SELECT t_juz.*, 
          COALESCE(
            json_agg(
              DISTINCT jsonb_build_object(
                'id', t_juzitems.id,
                'surah_id', t_alquran.id,
                'surah', t_alquran.name,
                'from_ayat', t_juzitems.from_ayat,
                'to_ayat', t_juzitems.to_ayat,
                'from_line', t_juzitems.from_line,
                'to_line', t_juzitems.to_line
              )
            ) FILTER (WHERE t_juzitems.id IS NOT NULL), '[]'
          ) AS surah,
          COALESCE((SELECT SUM(to_ayat) FROM t_juzitems WHERE t_juzitems.juz_id = t_juz.id), 0) AS total_ayat,
          COALESCE((SELECT SUM(to_line) FROM t_juzitems WHERE t_juzitems.juz_id = t_juz.id), 0) AS total_line
        FROM t_juz
        LEFT JOIN t_juzitems ON t_juz.id = t_juzitems.juz_id
        LEFT JOIN t_alquran ON t_juzitems.surah_id = t_alquran.id
        WHERE LOWER(t_juz.name) LIKE LOWER($1)
        GROUP BY t_juz.id
        ORDER BY t_juz.id ASC
        LIMIT $2 OFFSET $3
      `;
      values = [
        `%${search}%`,
        parseInt(limit),
        (parseInt(page) - 1) * parseInt(limit),
      ];

      const data = await client.query(query, values);
      res.json({
        totalData,
        totalPage,
        juz: data.rows,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/add-surah", authorize("tahfiz"), async (req, res) => {
  try {
    const { id, name, count, lines } = req.body;

    if (id) {
      await client.query(
        `UPDATE t_alquran
      SET name = $1, ayat = $2, lines = $3 WHERE id = $4`,
        [name, count, lines, id]
      );
    } else {
      await client.query(
        `INSERT INTO t_alquran (name, ayat, lines) VALUES ($1, $2, $3)`,
        [name, count, lines]
      );
    }

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
      const querySearch = `
                SELECT * 
                FROM t_alquran
                WHERE name ILIKE $1
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
                WHERE name ILIKE $1
                ORDER BY id
                LIMIT $2 OFFSET $3
            `;
    const queryTotalData = `
                SELECT COUNT(*) as total_surah
                FROM t_alquran
                WHERE name ILIKE $1
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
