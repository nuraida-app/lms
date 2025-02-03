import express from "express";
import { client } from "../../connection/connection.js";
import { authorize } from "../../middleware/authenticate.js";

const router = express.Router();

const create = "Berhasil disimpan";
const update = "Berhail diperbarui";
const del = "Berhasil dihapus";

router.post("/add-year", authorize("super-admin"), async (req, res) => {
  try {
    const { id, name } = req.body;

    if (id) {
      await client.query(`UPDATE years SET name = $1 WHERE id = $2`, [
        name,
        id,
      ]);
    } else {
      await client.query(`INSERT INTO years (name) VALUES ($1)`, [name]);
    }

    res.status(201).json({ message: id ? update : create });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/get-years", async (req, res) => {
  try {
    let { page, limit, search } = req.query;

    search = search || "";

    let query;
    let values;

    if (!page && !limit) {
      // If page and limit are not provided, fetch all data without pagination
      query = `
        SELECT * 
        FROM years 
        WHERE name ILIKE $1
        ORDER BY id ASC
      `;
      values = [`%${search}%`];
    } else {
      // Handle pagination with page and limit
      page = parseInt(page, 10) || 1;
      limit = parseInt(limit, 10) || 10;
      const offset = (page - 1) * limit;

      query = `
        SELECT * 
        FROM years 
        WHERE name ILIKE $1
        ORDER BY id ASC
        LIMIT $2 OFFSET $3
      `;
      values = [`%${search}%`, limit, offset];
    }

    // Execute query
    const data = await client.query(query, values);

    // Get total count for pagination metadata
    const countQuery = `
      SELECT COUNT(*) 
      FROM years 
      WHERE name ILIKE $1
    `;
    const countResult = await client.query(countQuery, [`%${search}%`]);
    const total = parseInt(countResult.rows[0].count, 10);

    res.status(200).json({
      data: data.rows,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

router.delete(
  "/delete-year/:id",
  authorize("super-admin"),
  async (req, res) => {
    try {
      await client.query(`DELETE FROM years WHERE id = $1`, [req.params.id]);

      res.status(200).json({ message: del });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
);

export default router;
