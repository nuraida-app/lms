import express from "express";
import { client } from "../../connection/connection.js";
import { authorize } from "../../middleware/authenticate.js";

const router = express.Router();

router.get(
  "/get-students-answer",
  authorize("admin", "teacher"),
  async (req, res) => {
    const {
      page = 1,
      limit = 10,
      search = "",
      code = "",
      quizId,
      gradeId,
    } = req.query;

    try {
      // Convert quizId, gradeId, and code to integers
      const parsedQuizId = parseInt(quizId, 10);
      const parsedGradeId = parseInt(gradeId, 10);
      const parsedCode = code ? parseInt(code, 10) : null;
      const parsedLimit = parseInt(limit, 10);
      const parsedPage = parseInt(page, 10);

      if (isNaN(parsedQuizId) || isNaN(parsedGradeId)) {
        return res.status(400).json({ message: "Invalid quizId or gradeId" });
      }

      // Calculate offset for pagination
      const offset = (parsedPage - 1) * parsedLimit;

      // Get total data count
      const totalCountQuery = `
        SELECT COUNT(*) AS total
        FROM students_class
        INNER JOIN user_student ON user_student.nis = students_class.nis
        WHERE students_class.grade_id = $1
          AND ($2::integer IS NULL OR students_class.class_code = $2)
          AND ($3::text IS NULL OR user_student.name ILIKE '%' || $3 || '%')
      `;

      const { rows: totalCountResult } = await client.query(totalCountQuery, [
        parsedGradeId,
        parsedCode,
        search || null,
      ]);

      const totalData = parseInt(totalCountResult[0].total, 10);
      const totalPages = Math.ceil(totalData / parsedLimit);

      // Fetch students with optional search and class code filtering
      const studentsQuery = `
        SELECT students_class.nis, user_student.name, classes.name AS class, grades.grade
        FROM students_class
        INNER JOIN user_student ON user_student.nis = students_class.nis
        INNER JOIN grades ON grades.id = students_class.grade_id
        INNER JOIN classes ON classes.code = students_class.class_code
        WHERE students_class.grade_id = $1
          AND ($2::integer IS NULL OR students_class.class_code = $2)
          AND ($3::text IS NULL OR user_student.name ILIKE '%' || $3 || '%')
        ORDER BY classes.name, user_student.name
        LIMIT $4 OFFSET $5
      `;

      const { rows: studentsData } = await client.query(studentsQuery, [
        parsedGradeId,
        parsedCode,
        search || null,
        parsedLimit,
        offset,
      ]);

      const { rows: answersData } = await client.query(
        `SELECT DISTINCT ON (quiz_id, question_id, nis) *
         FROM answers 
         WHERE quiz_id = $1
         ORDER BY quiz_id, question_id, nis, createdat DESC`,
        [parsedQuizId]
      );

      const { rows: questionsData } = await client.query(
        `SELECT * FROM questions WHERE quiz_id = $1`,
        [parsedQuizId]
      );

      const { rows: quizData } = await client.query(
        "SELECT * FROM quizzes WHERE id = $1",
        [parsedQuizId]
      );

      const mcWeight = quizData[0].mc_weight / 100;
      const essayWeight = quizData[0].essay_weight / 100;

      const results = studentsData.map((student) => {
        let mcPoin = 0;
        let essayPoin = 0;
        let correct = 0;
        let wrong = 0;

        const studentAnswer = {
          nis: student.nis,
          name: student.name,
          grade: student.grade,
          class: student.class,
          essayPoin: 0,
          mcPoin: 0,
          totalPoin: 0,
          correct: 0,
          wrong: 0,
          answers: [],
        };

        const studentAnswers = answersData.filter(
          (answer) => answer.nis.toString() === student.nis.toString()
        );

        studentAnswers.forEach((answer) => {
          const matchingQuestion = questionsData.find(
            (question) => question.id === answer.question_id
          );

          if (matchingQuestion) {
            const isCorrect = answer.mc === matchingQuestion.key;

            if (matchingQuestion.type === 1) {
              if (isCorrect) {
                correct++;
              } else {
                wrong++;
              }
              studentAnswer.answers.push({
                questionId: answer.question_id,
                key: matchingQuestion.key,
                mc: answer.mc,
                essay: answer.essay,
                poin: isCorrect ? matchingQuestion.score : 0,
              });
            } else if (matchingQuestion.type === 2) {
              studentAnswer.answers.push({
                questionId: answer.question_id,
                key: matchingQuestion.key,
                mc: answer.mc,
                essay: answer.essay,
                poin: answer.poin || 0,
              });
            }
          }
        });

        mcPoin = studentAnswer.answers
          .filter((answer) =>
            questionsData.find(
              (q) => q.id === answer.questionId && q.type === 1
            )
          )
          .reduce((acc, answer) => acc + (parseFloat(answer.poin) || 0), 0);

        essayPoin = studentAnswer.answers
          .filter((answer) =>
            questionsData.find(
              (q) => q.id === answer.questionId && q.type === 2
            )
          )
          .reduce((acc, answer) => acc + (parseFloat(answer.poin) || 0), 0);

        studentAnswer.mcPoin = (mcPoin * mcWeight).toFixed(2);
        studentAnswer.essayPoin = (essayPoin * essayWeight).toFixed(2);

        studentAnswer.totalPoin = (
          parseFloat(studentAnswer.mcPoin) + parseFloat(studentAnswer.essayPoin)
        ).toFixed(2);

        studentAnswer.correct = correct;
        studentAnswer.wrong = wrong;

        return studentAnswer;
      });

      res.status(200).json({ totalPages, totalData, results });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }
);

// Create Answer
router.post("/create", authorize("student"), async (req, res) => {
  try {
    const { quizId, questionId, type, mc, essay, poin } = req.body;

    const existingAnswer = await client.query(
      "SELECT * FROM answers WHERE quiz_id = $1 AND question_id = $2 AND nis = $3",
      [quizId, questionId, req.user.nis]
    );

    if (existingAnswer.rowCount > 0) {
      await client.query(
        "DELETE FROM answers WHERE quiz_id = $1 AND question_id = $2 AND nis = $3",
        [quizId, questionId, req.user.nis]
      );
    }

    await client.query(
      "INSERT INTO answers(quiz_id, question_id, type, nis, mc, essay, poin) " +
        "VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [quizId, questionId, type, req.user.nis, mc, essay, poin]
    );

    return res.status(200).json({ message: "Saved" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// jawaban ragu
router.put("/doubt", authorize("student"), async (req, res) => {
  try {
    const { quizId, questionId } = req.body;

    if (questionId === undefined || questionId === null || questionId === "") {
      return null;
    }

    const data = await client.query(
      "SELECT * FROM answers WHERE quiz_id = $1 AND question_id = $2 AND nis = $3",
      [quizId, questionId, req.user.nis]
    );

    if (!data) {
      return res.status(404).json({ message: "Answer not found" });
    }

    const yes = true;
    const no = false;

    if (data.rows[0].doubt) {
      await client.query(
        `UPDATE answers SET doubt = $1
            WHERE quiz_id = $2 AND question_id = $3 AND nis = $4`,
        [no, quizId, questionId, req.user.nis]
      );

      return res.status(200).json({ message: "Saved" });
    } else {
      await client.query(
        `UPDATE answers SET doubt = $1
            WHERE quiz_id = $2 AND question_id = $3 AND nis = $4`,
        [yes, quizId, questionId, req.user.nis]
      );

      return res.status(200).json({ message: "Saved" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Menampilkan jawaban berdasarkan Bank soal dan nis
router.get(
  "/get-my-answer/:exam_id",
  authorize("student"),
  async (req, res) => {
    try {
      const data = await client.query(
        "SELECT * FROM answers WHERE quiz_id = $1 AND nis = $2",
        [req.params.exam_id, req.user.nis]
      );

      const answers = data.rows;

      res.status(200).json(answers);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// Memberikan nilai uraian
router.put(
  "/give-score-essay/:questionId",
  authorize("admin", "teacher"),
  async (req, res) => {
    try {
      const answer = await client.query(
        "SELECT * FROM answers WHERE question_id = $1",
        [req.params.questionId]
      );

      if (answer.rowCount === 0) {
        return res.status(404).json({ error: "Data not found" });
      }

      await client.query(
        "UPDATE answers SET poin = $1 WHERE question_id = $2 AND nis = $3",
        [req.body.poin, req.params.questionId, req.body.nis]
      );

      // Kembalikan respons berhasil
      return res.status(200).json({ message: "Saved" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }
);

// reset siswa
router.put(
  "/reset/:nis/:bankid",
  authorize("admin", "guru"),
  async (req, res) => {
    try {
      const { nis, bankid } = req.params;

      // menemukan pertanyaan berdarkan bank
      const dataQuestions = await client.query(
        "SELECT * FROM pertanyaan WHERE bank_id = $1",
        [bankid]
      );

      // menemukan jawaban berdasarkan nis
      const dataAnswers = await client.query(
        "SELECT * FROM jawaban WHERE nis = $1 AND bank_id = $2",
        [nis, bankid]
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }
);

export default router;
