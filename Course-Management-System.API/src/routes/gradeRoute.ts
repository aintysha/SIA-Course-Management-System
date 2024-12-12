/*import express from "express";
import { GradeController } from "../controllers/gradeController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
const gradeController = new GradeController();

/**
 * @swagger
 * tags:
 *   name: Grade
 *   description: Grade endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Grade:
 *       type: object
 *       required:
 *         - Grade_ID
 *         - Student_ID
 *         - Subj_desc
 *         - Units
 *         - Credits
 *         - Remarks
 *       properties:
 *         Grade_ID:
 *           type: number
 *           description: Unique identifier for the grade
 *         Student_ID:
 *           type: number
 *           description: Unique identifier for the student
 *         Subj_desc:
 *           type: string
 *           description: Subject description
 *         Units:
 *           type: number
 *           description: Number of units for the subject
 *         Credits:
 *           type: number
 *           description: Number of credits earned
 *         Remarks:
 *           type: string
 *           description: Remarks or comments for the grade
 */

/**
 * @swagger
 * /api/grade:
 *   post:
 *     summary: Create a new grade
 *     tags: [Grade]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Grade'
 *     responses:
 *       201:
 *         description: Grade created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grade'
 *       400:
 *         description: Validation error
 *
 *   get:
 *     summary: Get all grades
 *     tags: [Grade]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of grades
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Grade'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     pages:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 */

/**
 * @swagger
 * /api/grade/{id}:
 *   get:
 *     summary: Get grade by ID
 *     tags: [Grade]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Grade ID
 *     responses:
 *       200:
 *         description: Grade details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grade'
 *       404:
 *         description: Grade not found
 *
 *   put:
 *     summary: Update grade
 *     tags: [Grade]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Grade ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Subj_desc:
 *                 type: string
 *               Units:
 *                 type: number
 *               Credits:
 *                 type: number
 *               Remarks:
 *                 type: string
 *     responses:
 *       200:
 *         description: Grade updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grade'
 *       404:
 *         description: Grade not found
 *
 *   delete:
 *     summary: Delete grade
 *     tags: [Grade]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Grade ID
 *     responses:
 *       204:
 *         description: Grade deleted successfully
 *       404:
 *         description: Grade not found
 */

// Routes
/*
router.post("/api/grade", authMiddleware, gradeController.createGrade); // Create a new grade
router.get("/api/grade", authMiddleware, gradeController.getAllGrades); // Retrieve all grades
router.get("/api/grade/:id", authMiddleware, gradeController.getGradeById); // Retrieve a specific grade by ID
router.put("/api/grade/:id", authMiddleware, gradeController.updateGrade); // Update a grade by ID
router.delete("/api/grade/:id", authMiddleware, gradeController.deleteGrade); // Delete a grade by ID

export default router;
*/