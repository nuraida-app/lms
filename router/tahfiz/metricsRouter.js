import express from "express";
import { authorize } from "../../middleware/authenticate.js";
import { client } from "../../connection/connection.js";

const router = express.Router();

const update = "Berhasil disimpan";
const create = "Berhasil ditambahkan";
const del = "Berhasil dihapus";

// Category
router.post("/add-category", authorize("tahfiz"), async (req, res) => {
  try {
    const { id, name } = req.body;

    if (id) {
      await client.query(`UPDATE t_categories SET name = $1 WHERE id = $2`, [
        name,
        id,
      ]);
    } else {
      await client.query(
        `INSERT INTO t_categories(name) VALUES($1) RETURNING *`,
        [name]
      );
    }

    res.status(200).json({ message: id ? update : create });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/get-categories", authorize("tahfiz"), async (req, res) => {
  try {
    // Query untuk mendapatkan kategori, ID, dan indikator terkait
    const query = `
      SELECT 
        c.id AS category_id,
        c.name AS category, 
       json_agg(
          CASE
            WHEN i.id IS NOT NULL THEN
             json_build_object(
                'id', i.id,
                'name', i.name,
                'category_id', c.id
              )
            ELSE NULL
          END
          ORDER BY i.name ASC
        ) AS indicators
      FROM t_categories c
      LEFT JOIN t_indicators i ON c.id = i.category_id
      GROUP BY c.id, c.name
      ORDER BY c.id;
    `;

    const result = await client.query(query);

    // Struktur data sesuai kebutuhan
    const categories = result.rows.map((row) => ({
      id: row.category_id,
      category: row.category,
      indicators: row.indicators || [],
    }));

    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete-category/:id", authorize("tahfiz"), async (req, res) => {
  try {
    await client.query(`DELETE FROM t_categories WHERE id = $1`, [
      req.params.id,
    ]);

    res.status(200).json({ message: del });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Indicator
router.post("/add-indicator", authorize("tahfiz"), async (req, res) => {
  try {
    const { id, name, categoryId } = req.body;

    if (id) {
      await client.query(
        `UPDATE t_indicators SET name = $1, category_id = $2 WHERE id = $3`,
        [name, categoryId, id]
      );
    } else {
      await client.query(
        `INSERT INTO t_indicators(name, category_id) VALUES($1, $2) RETURNING *`,
        [name, categoryId]
      );
    }

    res.status(200).json({ message: id ? update : create });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.delete(
  "/delete-indicator/:id",
  authorize("tahfiz"),
  async (req, res) => {
    try {
      await client.query(`DELETE FROM t_indicators WHERE id = $1`, [
        req.params.id,
      ]);

      res.status(200).json({ message: del });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
);

// tipe Penilaiian
router.post("/add-type", authorize("tahfiz"), async (req, res) => {
  try {
    const { id, name } = req.body;

    if (id) {
      await client.query(`UPDATE t_type SET name = $1 WHERE id = $2`, [
        name,
        id,
      ]);
    } else {
      await client.query(`INSERT INTO t_type(name) VALUES($1) RETURNING *`, [
        name,
      ]);
    }

    res.status(200).json({ message: id ? update : create });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/get-types", authorize("tahfiz"), async (req, res) => {
  try {
    const data = await client.query(`SELECT * FROM t_type ORDER BY id ASC`);

    res.status(200).json(data.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete-type/:id", authorize("tahfiz"), async (req, res) => {
  try {
    await client.query(`DELETE FROM t_type WHERE id = $1`, [req.params.id]);

    res.status(200).json({ message: del });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
