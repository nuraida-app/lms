import express from "express";
import { client } from "../../connection/connection.js";
import { authorize } from "../../middleware/authenticate.js";

const router = express.Router();

router.get("/get-provinces", async (req, res) => {
  try {
    const data = await client.query(
      `SELECT * FROM provinces ORDER BY name ASC`
    );

    const trimed = data.rows?.map((row) => ({
      id: row.id.trim(),
      name: row.name,
    }));

    res.json(trimed);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

router.get("/get-regencies/:provinceId", async (req, res) => {
  try {
    const data = await client.query(
      `SELECT * FROM regencies WHERE province_id = $1 ORDER BY name ASC`,
      [req.params.provinceId]
    );

    const trimed = data.rows.map((row) => ({
      id: row.id.trim(),
      name: row.name,
    }));

    res.json(trimed);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/get-districts/:regencyId", async (req, res) => {
  try {
    const data = await client.query(
      `SELECT * FROM districts WHERE regency_id = $1 ORDER BY name ASC`,
      [req.params.regencyId]
    );

    const trimed = data.rows.map((row) => ({
      id: row.id.trim(),
      name: row.name,
    }));

    res.json(trimed);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/get-villages/:districtId", async (req, res) => {
  try {
    const data = await client.query(
      `SELECT * FROM villages WHERE district_id = $1 ORDER BY name ASC`,
      [req.params.districtId]
    );

    const trimed = data.rows.map((row) => ({
      id: row.id.trim(),
      name: row.name,
    }));

    res.json(trimed);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post(
  "/add-student-data",
  authorize("admin", "teacher", "student"),
  async (req, res) => {
    const {
      year_id,
      year,
      name,
      nisn,
      nis,
      birth_place,
      birth_date,
      height,
      weight,
      around_head,
      order_birth,
      siblings,
      province_id,
      province_name,
      regency_id,
      regency_name,
      district_id,
      district_name,
      village_id,
      village_name,
      address,
      postal_code,
    } = req.body;

    try {
      // Pengecekan apakah NIS sudah ada di db_students
      const studentCheck = await client.query(
        `SELECT * FROM db_students WHERE nis = $1`,
        [nis]
      );

      if (studentCheck.rows.length > 0) {
        // Jika NIS ditemukan, update kolom yang sesuai dengan data dari req.body
        await client.query(
          `UPDATE db_students SET
                    year_id = COALESCE($1, year_id),
                    year = COALESCE($2, year),
                    name = COALESCE($3, name),
                    birth_place = COALESCE($4, birth_place),
                    birth_date = COALESCE($5, birth_date),
                    height = COALESCE($6, height),
                    weight = COALESCE($7, weight),
                    around_head = COALESCE($8, around_head),
                    order_birth = COALESCE($9, order_birth),
                    siblings = COALESCE($10, siblings),
                    province_id = COALESCE($11, province_id),
                    province_name = COALESCE($12, province_name),
                    regency_id = COALESCE($13, regency_id),
                    regency_name = COALESCE($14, regency_name),
                    district_id = COALESCE($15, district_id),
                    district_name = COALESCE($16, district_name),
                    village_id = COALESCE($17, village_id),
                    village_name = COALESCE($18, village_name),
                    address = COALESCE($19, address),
                    postal_code = COALESCE($20, postal_code),
                    nisn = COALESCE($21, nisn)
                WHERE nis = $22
                RETURNING *`,
          [
            year_id,
            year,
            name,
            birth_place,
            birth_date,
            height,
            weight,
            around_head,
            order_birth,
            siblings,
            province_id,
            province_name,
            regency_id,
            regency_name,
            district_id,
            district_name,
            village_id,
            village_name,
            address,
            postal_code,
            nisn,
            nis,
          ]
        );

        return res.status(200).json({ message: "Berhasil diperbarui" });
      } else {
        // Jika NIS tidak ditemukan, tambahkan data baru ke db_students
        await client.query(
          `INSERT INTO db_students (
                   year_id, year, name, nisn, nis, birth_place, birth_date, height, weight, around_head,
                    order_birth, siblings, province_id, province_name, regency_id, 
                    regency_name, district_id, district_name, village_id, village_name, 
                    address, postal_code
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
                RETURNING *`,
          [
            year_id,
            year,
            name,
            nisn,
            nis,
            birth_place,
            birth_date,
            height,
            weight,
            around_head,
            order_birth,
            siblings,
            province_id,
            province_name,
            regency_id,
            regency_name,
            district_id,
            district_name,
            village_id,
            village_name,
            address,
            postal_code,
          ]
        );

        return res.status(201).json({ message: "Berhasil disimpan" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }
);

router.post(
  "/add-parents-data",
  authorize("admin", "teacher", "student"),
  async (req, res) => {
    const {
      nis,
      father_nik,
      father_name,
      father_birth_place,
      father_birth_date,
      father_job,
      father_phone,
      mother_nik,
      mother_name,
      mother_birth_place,
      mother_birth_date,
      mother_job,
      mother_phone,
    } = req.body;

    try {
      // Check if the student exists in db_students
      const studentCheck = await client.query(
        `SELECT * FROM db_students WHERE nis = $1`,
        [nis]
      );

      if (studentCheck.rowCount > 0) {
        await client.query(
          `UPDATE db_students SET
              father_nik = COALESCE($1, father_nik),
              father_name = COALESCE($2, father_name),
              father_birth_place = COALESCE($3, father_birth_place),
              father_birth_date = COALESCE($4, father_birth_date),
              father_job = COALESCE($5, father_job),
              father_phone = COALESCE($8, father_phone),
              mother_nik = COALESCE($9, mother_nik),
              mother_name = COALESCE($10, mother_name),
              mother_birth_place = COALESCE($11, mother_birth_place),
              mother_birth_date = COALESCE($12, mother_birth_date),
              mother_job = COALESCE($13, mother_job),
              mother_phone = COALESCE($16, mother_phone)
            WHERE nis = $17
            RETURNING *`,
          [
            father_nik,
            father_name,
            father_birth_place,
            father_birth_date,
            father_job,
            father_phone,
            mother_nik,
            mother_name,
            mother_birth_place,
            mother_birth_date,
            mother_job,
            mother_phone,
            nis,
          ]
        );

        return res.status(200).json({ message: "Berhasil disimpan" });
      } else {
        return res.status(404).json({ message: "Data tidak ditemukan" });
      }
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ message: error.message });
    }
  }
);

router.post(
  "/add-family-data",
  authorize("admin", "teacher", "student"),
  async (req, res) => {
    const { nis, familyData } = req.body;

    try {
      // Pengecekan apakah NIS sudah ada di db_students
      const studentCheck = await client.query(
        `SELECT * FROM db_students WHERE nis = $1`,
        [nis]
      );

      if (studentCheck.rows.length > 0) {
        // Fetch the existing family_info
        const currentFamilyInfo = studentCheck.rows[0].family_info || [];

        // Map existing family_info by ID for quick lookup
        const familyInfoMap = new Map();
        currentFamilyInfo.forEach((item) => familyInfoMap.set(item.id, item));

        // Combine existing family_info with the new data
        familyData.forEach((item) => {
          familyInfoMap.set(item.id, item); // Update or add the item
        });

        // Convert map values back to an array
        const updatedFamilyInfo = Array.from(familyInfoMap.values());

        // Update the family_info in the database
        const updateResult = await client.query(
          `UPDATE db_students SET
                family_info = $1
            WHERE nis = $2
            RETURNING *`,
          [JSON.stringify(updatedFamilyInfo), nis]
        );

        return res.status(200).json({ message: "Family data updated" });
      } else {
        // Jika NIS tidak ditemukan, kembalikan error
        return res.status(404).json({ message: "NIS not found" });
      }
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ message: error.message });
    }
  }
);

router.delete(
  "/delete-family-data",
  authorize("admin", "teacher", "student"),
  async (req, res) => {
    const { nis, familyId } = req.body;

    try {
      // Check if NIS exists in db_students
      const studentCheck = await client.query(
        `SELECT * FROM db_students WHERE nis = $1`,
        [nis]
      );

      if (studentCheck.rows.length > 0) {
        // Get the current family_info
        const currentFamilyInfo = studentCheck.rows[0].family_info || [];

        // Filter out the family data by id
        const updatedFamilyInfo = currentFamilyInfo.filter(
          (item) => item.id !== familyId
        );

        // Update the family_info in the database
        const updateResult = await client.query(
          `UPDATE db_students SET family_info = $1 WHERE nis = $2 RETURNING *`,
          [JSON.stringify(updatedFamilyInfo), nis]
        );

        return res.status(200).json({ message: "Family data deleted" });
      } else {
        return res.status(404).json({ message: "NIS not found" });
      }
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ message: error.message });
    }
  }
);

// menampilkan presentasi kelengkapaan data
router.get(
  "/get-database",
  authorize("super-admin", "admin", "teacher"),
  async (req, res) => {
    const { page = 1, limit = 10, search = "", classCode } = req.query;
    const homebase = req.user.homebase_id; // Homebase diambil langsung dari req.user

    try {
      const offset = (page - 1) * limit;

      const query = `
        WITH student_completeness AS (
          SELECT 
            s.nis,
            s.name AS nama_lengkap,
            s.status,
            34 AS total_columns,
            (
              SELECT COUNT(*)
              FROM (
                VALUES
                  (s.name),
                  (s.nisn),
                  (s.nis::text),
                  (s.birth_place),
                  (s.birth_date::text),
                  (s.height::text),
                  (s.weight::text),
                  (s.around_head::text),
                  (s.order_birth::text),
                  (s.siblings::text),
                  (s.province_id),
                  (s.province_name),
                  (s.regency_id),
                  (s.regency_name),
                  (s.district_id),
                  (s.district_name),
                  (s.village_id),
                  (s.village_name),
                  (s.address),
                  (s.postal_code),
                  (s.father_nik),
                  (s.father_name),
                  (s.father_birth_place),
                  (s.father_birth_date::text),
                  (s.father_job),
                  (s.father_phone::text),
                  (s.mother_nik),
                  (s.mother_name),
                  (s.mother_birth_place),
                  (s.mother_birth_date::text),
                  (s.mother_job),
                  (s.mother_phone::text),
                  (s.family_info::text),
                  (s.year)
              ) AS data(column_value)
              WHERE column_value IS NOT NULL
            ) AS filled_columns
          FROM db_students s
        )
        SELECT 
          us.id,
          sc.nis,
          c.name AS kelas,
          g.grade AS tingkat,
          s.nama_lengkap,
          s.status,
          ROUND(
            ((filled_columns::numeric / total_columns) * 100), 2
          ) AS kelengkapan
        FROM students_class sc
        JOIN student_completeness s ON sc.nis = s.nis
        JOIN classes c ON sc.class_code = c.code AND sc.grade_id = c.grade_id
        JOIN grades g ON sc.grade_id = g.id
        JOIN user_student us ON us.nis = sc.nis
        WHERE 
          ($1::text IS NULL OR s.nama_lengkap ILIKE '%' || $1 || '%')
          AND ($2::integer IS NULL OR sc.class_code = $2)
          AND ($3::integer IS NULL OR sc.homebase_id = $3)
        ORDER BY g.grade ASC, c.name ASC, s.nama_lengkap ASC
        LIMIT $4 OFFSET $5;
      `;

      const values = [
        search || null,
        classCode || null,
        homebase || null,
        parseInt(limit, 10),
        parseInt(offset, 10),
      ];

      const data = await client.query(query, values);
      const database = data.rows;

      // Hitung total data untuk paginasi
      const countQuery = `
        SELECT COUNT(*) AS total
        FROM students_class sc
        JOIN db_students s ON sc.nis = s.nis
        WHERE 
          ($1::text IS NULL OR s.name ILIKE '%' || $1 || '%')
          AND ($2::integer IS NULL OR sc.class_code = $2)
          AND ($3::integer IS NULL OR sc.homebase_id = $3);
      `;
      const countValues = [search || null, classCode || null, homebase || null];
      const countResult = await client.query(countQuery, countValues);
      const totalData = parseInt(countResult.rows[0].total, 10);
      const totalPages = Math.ceil(totalData / limit);

      res.status(200).json({
        database,
        totalData,
        totalPages,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }
);

router.get(
  `/get-student/:nis`,
  authorize("super-admin", "admin", "teacher", "student"),
  async (req, res) => {
    try {
      const data = await client.query(
        `SELECT * FROM db_students WHERE nis = $1`,
        [req.params.nis]
      );

      res.status(200).json(data.rows[0]);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// demographic
router.get(
  "/get-demographic",
  authorize("super-admin", "admin"),
  async (req, res) => {
    try {
      let data;

      if (req.user.role === "admin") {
        // Get the list of NIS for students under the admin's homebase
        const { rows: students } = await client.query(
          `SELECT nis FROM students_class WHERE homebase_id = $1`,
          [req.user.homebase_id]
        );

        // Extract NIS values into an array
        const nisList = students.map((student) => student.nis);

        if (nisList.length > 0) {
          const queryProvince = `
              SELECT province_id AS id, TRIM(province_name) AS name, COUNT(*)::INTEGER AS total 
              FROM db_students 
              WHERE nis = ANY($1)
              GROUP BY province_id, province_name
          `;
          const queryRegency = `
              SELECT regency_id AS id, TRIM(regency_name) AS name, COUNT(*)::INTEGER AS total 
              FROM db_students 
              WHERE nis = ANY($1)
              GROUP BY regency_id, regency_name
          `;
          const queryDistrict = `
              SELECT district_id AS id, TRIM(district_name) AS name, COUNT(*)::INTEGER AS total 
              FROM db_students 
              WHERE nis = ANY($1)
              GROUP BY district_id, district_name
          `;
          const queryVillage = `
              SELECT village_id AS id, TRIM(village_name) AS name, COUNT(*)::INTEGER AS total 
              FROM db_students 
              WHERE nis = ANY($1)
              GROUP BY village_id, village_name
          `;

          const [
            provincesResult,
            regenciesResult,
            districtsResult,
            villagesResult,
          ] = await Promise.all([
            client.query(queryProvince, [nisList]),
            client.query(queryRegency, [nisList]),
            client.query(queryDistrict, [nisList]),
            client.query(queryVillage, [nisList]),
          ]);

          data = {
            provinces: provincesResult.rows,
            regencies: regenciesResult.rows,
            districts: districtsResult.rows,
            villages: villagesResult.rows,
          };
        } else {
          data = {
            provinces: [],
            regencies: [],
            districts: [],
            villages: [],
          };
        }
      } else {
        const queryProvince = `
            SELECT province_id AS id, TRIM(province_name) AS name, COUNT(*)::INTEGER AS total 
            FROM db_students 
            GROUP BY province_id, province_name
        `;
        const queryRegency = `
            SELECT regency_id AS id, TRIM(regency_name) AS name, COUNT(*)::INTEGER AS total 
            FROM db_students 
            GROUP BY regency_id, regency_name
        `;
        const queryDistrict = `
            SELECT district_id AS id, TRIM(district_name) AS name, COUNT(*)::INTEGER AS total 
            FROM db_students 
            GROUP BY district_id, district_name
        `;
        const queryVillage = `
            SELECT village_id AS id, TRIM(village_name) AS name, COUNT(*)::INTEGER AS total 
            FROM db_students 
            GROUP BY village_id, village_name
        `;

        const [
          provincesResult,
          regenciesResult,
          districtsResult,
          villagesResult,
        ] = await Promise.all([
          client.query(queryProvince),
          client.query(queryRegency),
          client.query(queryDistrict),
          client.query(queryVillage),
        ]);

        data = {
          provinces: provincesResult.rows,
          regencies: regenciesResult.rows,
          districts: districtsResult.rows,
          villages: villagesResult.rows,
        };
      }

      res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

function calculateAge(birthDate) {
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDiff = today.getMonth() - birthDateObj.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
  ) {
    age--;
  }
  return age;
}

router.get("/get-targeted", async (req, res) => {
  try {
    const data = await client.query(`SELECT name AS student_name,
    family_info, father_phone, mother_phone FROM db_students
    WHERE family_info IS NOT NULL`);

    if (data.rowCount === 0) {
      return res.status(404).json({ message: "There is no data provided" });
    }

    const studentsData = data.rows;
    const response = studentsData.map((student) => {
      const familyInfo = student.family_info;
      const familyDetails = [];

      // Loop through each family member and calculate age
      familyInfo.forEach((member) => {
        const age = calculateAge(member.family_birth_date);
        if (member.family_gender === "Female" && age >= 10 && age <= 15) {
          familyDetails.push({
            target_name: member.family_name,
            gender: member.family_gender,
            age: age,
          });
        }
      });

      return {
        student_name: student.student_name,
        phone: {
          father_phone: student.father_phone,
          mother_phone: student.mother_phone,
        },
        family: familyDetails,
      };
    });

    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
