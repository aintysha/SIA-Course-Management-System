"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gradeController_1 = require("../controllers/gradeController");
const authMiddleware_1 = require("../middleware/authMiddleware");
// Initialize express Router
const router = express_1.default.Router();
// Create instance of GradeController to handle route logic
const gradeController = new gradeController_1.GradeController();
/**
 * @swagger
 * tags:
 *   name: Grades
 *   description: Grade endpoints
 */
/**
 * @swagger
 * /api/grades:
 *   post:
 *     summary: Create a new grade record
 *     tags: [Grades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Grade_ID:
 *                 type: number
 *               Student_ID:
 *                 type: number
 *               Subj_desc:
 *                 type: string
 *               Units:
 *                 type: number
 *               Credits:
 *                 type: number
 *               Remarks:
 *                 type: string
 *     responses:
 *       201:
 *         description: Grade record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Grade record created successfully
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *
 *   get:
 *     summary: Get all grade records
 *     tags: [Grades]
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
 *         description: List of grade records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Grade_ID:
 *                         type: number
 *                       Student_ID:
 *                         type: number
 *                       Subj_desc:
 *                         type: string
 *                       Units:
 *                         type: number
 *                       Credits:
 *                         type: number
 *                       Remarks:
 *                         type: string
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
 * /api/grades/{id}:
 *   get:
 *     summary: Get grade by ID
 *     tags: [Grades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Grade ID
 *     responses:
 *       200:
 *         description: Grade details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Grade_ID:
 *                   type: number
 *                 Student_ID:
 *                   type: number
 *                 Subj_desc:
 *                   type: string
 *                 Units:
 *                   type: number
 *                 Credits:
 *                   type: number
 *                 Remarks:
 *                   type: string
 *       404:
 *         description: Grade not found
 *
 *   put:
 *     summary: Update grade record
 *     tags: [Grades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
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
 *       404:
 *         description: Grade not found
 *
 *   delete:
 *     summary: Delete grade record
 *     tags: [Grades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Grade ID
 *     responses:
 *       204:
 *         description: Grade deleted successfully
 *       404:
 *         description: Grade not found
 */
// Grade Routes:
// POST /api/grades
// Creates a new grade record
router.post("/", authMiddleware_1.authMiddleware, gradeController.createGrade);
// GET /api/grades
// Retrieves all grade records
router.get("/api/grades", authMiddleware_1.authMiddleware, gradeController.getAllGrades);
// GET /api/grades/:id
// Retrieves a specific grade by its ID
router.get("/api/grades:id", authMiddleware_1.authMiddleware, gradeController.getGradeById);
// PUT /api/grades/:id
// Updates a specific grade record by ID
router.put("/api/grades:id", authMiddleware_1.authMiddleware, gradeController.updateGrade);
// DELETE /api/grades/:id
// Removes a grade record by ID
router.delete("/api/grades:id", authMiddleware_1.authMiddleware, gradeController.deleteGrade);
// Export the router for use in the main application
exports.default = router;