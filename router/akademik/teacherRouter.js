import express from "express";
import { client } from "../../connection/connection.js";
import bcrypt from "bcrypt";
import { authorize } from "../../middleware/authenticate.js";

const router = express.Router();

// Mendaftarkan guru
router.post("/create", authorize("admin"), async (req, res) => {
  try {
    const { nip, name, subjectCodes, homeIds, classCode, homeroom, id } =
      req.body;

    const password = "12345678";
    const role = "teacher";

    if (id) {
      // Jika ID ada, lakukan update pada user_teacher
      try {
        const updateQuery = `UPDATE user_teacher SET nip = $1, homebase_id = $2, 
          name = $3, subject_code = $4, homeroom = $5, 
          class_code = $6 WHERE id = $7 RETURNING *`;

        const updateValues = [
          nip,
          homeIds,
          name,
          subjectCodes,
          homeroom,
          classCode || null,
          id,
        ];

        const updateResult = await client.query(updateQuery, updateValues);

        if (updateResult.rowCount === 0) {
          return res.status(404).json({ message: "Data tidak ditemukan" });
        }

        return res.status(200).json({
          message: "Data berhasil diperbarui",
          data: updateResult.rows[0],
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
      }
    } else {
      // Jika ID tidak ada, lakukan insert baru
      const userChecking = await client.query(
        "SELECT * FROM user_teacher WHERE nip = $1",
        [nip]
      );

      if (userChecking.rowCount > 0) {
        return res.status(500).json({ message: "NIP sudah digunakan" });
      }

      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }

        const insertionQuery =
          "INSERT INTO user_teacher " +
          "(nip, homebase_id, name, subject_code, homeroom, class_code, password, role) " +
          "VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";

        const insertionValues = [
          nip,
          homeIds,
          name,
          subjectCodes,
          homeroom,
          classCode || null,
          hash,
          role,
        ];

        try {
          const process = await client.query(insertionQuery, insertionValues);
          const user = process.rows[0];

          return res
            .status(200)
            .json({ message: "Berhasil ditambahkan", data: user });
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: error.message });
        }
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

// Mengupload guru
router.post("/upload", authorize("admin"), async (req, res) => {
  try {
    const data = req.body.data;
    const homebase = req.user.homebase_id;

    const password = "12345678";
    const role = "teacher";

    // Memeriksa apakah data yang diterima memiliki nilai null untuk name
    const teachersData = data.filter(
      (item) => item[0] !== null && item[0] !== undefined
    );

    // Memproses setiap baris data
    for (const teacher of teachersData) {
      // Memeriksa apakah data yang diterima memiliki nilai yang valid
      if (
        teacher.length >= 3 &&
        teacher.every((item) => item !== null && item !== undefined)
      ) {
        bcrypt.hash(password, 10, async (err, hash) => {
          if (err) {
            console.error(err);
            return res.status(500).json({
              message: "There is an error while encrypting the password",
            });
          }
          client.query(
            "INSERT INTO user_teacher " +
              "(nip, name, subject_code, password, role, homebase_id) " +
              "VALUES ($1, $2, $3, $4, $5, $6)",
            [
              teacher[0],
              teacher[1],
              `{${teacher[2]}}`,
              hash,
              role,
              `{${homebase}}`,
            ],
            (err, result) => {
              if (err) {
                console.error(err);
                return res.status(500).json({
                  message:
                    "There is an error while adding teachers to database",
                });
              }
            }
          );
        });
      } else {
        return res.status(500).json({ message: `Kesalahan data: ${teacher}` });
      }
    }

    res.status(200).json({
      message: `${teachersData.length} teachers are successfully added`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

// Menampilkan guru
router.get("/get", authorize("admin", "super-admin"), async (req, res) => {
  try {
    const { role, homebase_id } = req.user;
    const { page, limit, search } = req.query;

    let query;
    let queryParams = [];

    if (!page && !limit && !search) {
      // Jika page, limit, dan search tidak ada, tampilkan semua guru berdasarkan homebase_id
      if (role === "super-admin") {
        query = `
          SELECT 
            user_teacher.id, 
            user_teacher.nip, 
            user_teacher.name, 
            user_teacher.email, 
            homebase.name AS homebase_name, 
            user_teacher.homeroom, 
            classes.name AS class, 
            COALESCE(
              ARRAY_AGG(
                json_build_object('id', subjects.id, 'code', subjects.code, 'subject', subjects.name)
              ) FILTER (WHERE subjects.code IS NOT NULL), 
              '{}'::json[]
            ) AS subjects 
          FROM user_teacher 
          LEFT JOIN unnest(user_teacher.subject_code) AS teacher_subject_code ON true
          LEFT JOIN subjects ON subjects.code = teacher_subject_code
          INNER JOIN homebase ON homebase.id = ANY(user_teacher.homebase_id) 
          LEFT JOIN classes ON classes.code = user_teacher.class_code 
          GROUP BY 
            user_teacher.id, 
            user_teacher.nip, 
            user_teacher.name, 
            user_teacher.email, 
            homebase.name, 
            user_teacher.homeroom, 
            classes.name 
          ORDER BY user_teacher.name ASC;
        `;
      } else {
        query = `
          SELECT 
            user_teacher.id, 
            user_teacher.nip, 
            user_teacher.name, 
            user_teacher.email, 
            user_teacher.homeroom, 
            classes.name AS class, 
            COALESCE(
              ARRAY_AGG(
                json_build_object('id', subjects.id, 'code', subjects.code, 'subject', subjects.name)
              ) FILTER (WHERE subjects.code IS NOT NULL), 
              '{}'::json[]
            ) AS subjects 
          FROM user_teacher 
          LEFT JOIN unnest(user_teacher.subject_code) AS teacher_subject_code ON true
          LEFT JOIN subjects ON subjects.code = teacher_subject_code
          INNER JOIN homebase ON homebase.id = ANY(user_teacher.homebase_id) 
          LEFT JOIN classes ON classes.code = user_teacher.class_code 
          WHERE $1 = ANY(user_teacher.homebase_id)
          GROUP BY 
            user_teacher.id, 
            user_teacher.nip, 
            user_teacher.name, 
            user_teacher.email, 
            user_teacher.homeroom, 
            classes.name 
          ORDER BY user_teacher.name ASC;
        `;
        queryParams.push(homebase_id);
      }
    } else {
      // Jika page, limit, atau search ada, gunakan logika sebelumnya
      const offset = (parseInt(page) - 1) * parseInt(limit);
      const queryLimit = parseInt(limit);

      if (role === "super-admin") {
        query = `
          SELECT 
            user_teacher.id, 
            user_teacher.nip, 
            user_teacher.name, 
            user_teacher.email, 
            homebase.name AS homebase_name, 
            user_teacher.homeroom, 
            classes.name AS class, 
            COALESCE(
              ARRAY_AGG(
                json_build_object('id', subjects.id, 'code', subjects.code, 'subject', subjects.name)
              ) FILTER (WHERE subjects.code IS NOT NULL), 
              '{}'::json[]
            ) AS subjects 
          FROM user_teacher 
          LEFT JOIN unnest(user_teacher.subject_code) AS teacher_subject_code ON true
          LEFT JOIN subjects ON subjects.code = teacher_subject_code
          INNER JOIN homebase ON homebase.id = ANY(user_teacher.homebase_id) 
          LEFT JOIN classes ON classes.code = user_teacher.class_code 
          WHERE user_teacher.name ILIKE $3
          GROUP BY 
            user_teacher.id, 
            user_teacher.nip, 
            user_teacher.name, 
            user_teacher.email, 
            homebase.name, 
            user_teacher.homeroom, 
            classes.name 
          ORDER BY user_teacher.name ASC
          LIMIT $1 OFFSET $2;
        `;
        queryParams.push(queryLimit, offset, `%${search}%`);
      } else {
        query = `
          SELECT 
            user_teacher.id, 
            user_teacher.nip, 
            user_teacher.name, 
            user_teacher.email, 
            user_teacher.homeroom, 
            classes.name AS class, 
            COALESCE(
              ARRAY_AGG(
                json_build_object('id', subjects.id, 'code', subjects.code, 'subject', subjects.name)
              ) FILTER (WHERE subjects.code IS NOT NULL), 
              '{}'::json[]
            ) AS subjects 
          FROM user_teacher 
          LEFT JOIN unnest(user_teacher.subject_code) AS teacher_subject_code ON true
          LEFT JOIN subjects ON subjects.code = teacher_subject_code
          INNER JOIN homebase ON homebase.id = ANY(user_teacher.homebase_id) 
          LEFT JOIN classes ON classes.code = user_teacher.class_code 
          WHERE $3 = ANY(user_teacher.homebase_id) AND user_teacher.name ILIKE $4
          GROUP BY 
            user_teacher.id, 
            user_teacher.nip, 
            user_teacher.name, 
            user_teacher.email, 
            user_teacher.homeroom, 
            classes.name 
          ORDER BY user_teacher.name ASC
          LIMIT $1 OFFSET $2;
        `;
        queryParams.push(queryLimit, offset, homebase_id, `%${search}%`);
      }
    }

    const data = await client.query(query, queryParams);

    if (!page && !limit && !search) {
      // Jika tidak ada pagination, tidak perlu menghitung total
      res.status(200).json({
        teachers: data.rows,
      });
    } else {
      const countQuery =
        role === "super-admin"
          ? `SELECT COUNT(*) FROM user_teacher WHERE name ILIKE $1`
          : `SELECT COUNT(*) FROM user_teacher WHERE $1 = ANY(homebase_id) AND name ILIKE $2`;
      const countParams =
        role === "super-admin" ? [`%${search}%`] : [homebase_id, `%${search}%`];
      const countResult = await client.query(countQuery, countParams);
      const totalCount = parseInt(countResult.rows[0].count);

      res.status(200).json({
        teachers: data.rows,
        total: totalCount,
        totalPages: Math.ceil(totalCount / (limit ? parseInt(limit) : 1)),
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Detail guru
router.get("/detail/:id", authorize("admin"), async (req, res) => {
  try {
    const data = await client.query(
      `SELECT 
          user_teacher.id, 
          user_teacher.nip, 
          user_teacher.name, 
          user_teacher.email, 
          user_teacher.subject_code,
          user_teacher.homebase_id, 
          homebase.name AS homebase, 
          user_teacher.homeroom, 
          classes.name AS class, 
          user_teacher.class_code, 
          array_agg(subjects.name) AS subjects
        FROM 
          user_teacher 
        INNER JOIN homebase ON homebase.id = ANY(user_teacher.homebase_id)
        LEFT JOIN 
          classes ON classes.code = user_teacher.class_code 
        LEFT JOIN 
          subjects ON subjects.code = ANY(user_teacher.subject_code) 
        WHERE 
          user_teacher.id = $1 
        GROUP BY 
          user_teacher.id, user_teacher.nip, user_teacher.name, user_teacher.email, 
          homebase.name, user_teacher.homeroom, classes.name, user_teacher.class_code`,
      [req.params.id]
    );

    res.status(200).json(data.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Memperbarui guru
router.put("/update/:id", authorize("admin", "guru"), async (req, res) => {
  try {
    const { id } = req.params;

    const { nip, name, homeroom, classCode, subjectIds, email, avatar } =
      req.body;

    const updatedTeacher = await client.query(
      "UPDATE teachers SET name = $1, email = $2, subject_code = $3, nip = $4, homeroom = $5, " +
        "class_code = $6, avatar = $7 WHERE id = $8 RETURNING *",
      [name, email, subjectIds, nip, homeroom, classCode, avatar, id]
    );

    if (updatedTeacher.rowCount > 0) {
      res.status(200).json({
        message: "Teacher is successfully updated",
        data: updatedTeacher.rows[0],
      });
    } else {
      res.status(404).json({ message: "Teacher not found" });
    }
  } catch (error) {
    console.error("Error updating teacher:", error);
    res.status(500).json({ message: error.message });
  }
});

// Menghapus guru
router.delete(
  "/delete/:id",
  authorize("admin", "super-admin"),
  async (req, res) => {
    try {
      const id = req.params.id;

      const data = await client.query(
        "DELETE FROM user_teacher WHERE id = $1 RETURNING *",
        [id]
      );

      if (data.rowCount === 0) {
        return res.status(404).json({ message: "Guru tidak ditemukan" });
      }

      res.status(200).json({
        message: "Berhasil dihapus",
        deletedTeacher: data.rows[0],
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Menghapus data guru
router.delete("/clear-data", authorize("admin"), async (req, res) => {
  try {
    const homebase = req.user.homebase_id;
    await client.query("DELETE FROM user_teacher WHERE homebase_id = $1", [
      homebase,
    ]);

    res.status(200).json({ message: "Berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Menambahkan kelas ajar
router.post("/assign-class", authorize("teacher"), async (req, res) => {
  try {
    const id = req.user.id; // Teacher ID from authenticated user
    const { subjectId, classes } = req.body; // Expecting subjectId and class array in the body

    // Fetch current subject_classes JSONB field
    const { rows } = await client.query(
      `SELECT subject_classes FROM teachers WHERE id = $1`,
      [id]
    );

    const currentSubjectClasses = rows[0].subject_classes || {};

    // Update the subject-specific classes in the subject_classes JSONB field
    currentSubjectClasses[subjectId] = classes;

    // Update the subject_classes field in the database
    await client.query(
      `UPDATE teachers SET subject_classes = $1 WHERE id = $2`,
      [currentSubjectClasses, id]
    );

    res.status(200).json({ message: "Saved" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
