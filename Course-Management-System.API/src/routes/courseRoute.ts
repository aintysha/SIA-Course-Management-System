import express from "express";
import { CourseController } from "../controllers/courseController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
const courseController = new CourseController();

/**
 * @swagger
 * tags:
 *   name: Course
 *   description: Course endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       required:
 *         - Course_ID
 *         - Course_name
 *         - Credits
 *         - Catalog_no
 *         - Academic_yr
 *       properties:
 *         Course_ID:
 *           type: number
 *           description: Unique identifier for the course
 *         Course_name:
 *           type: string
 *           description: Name of the course
 *         Credits:
 *           type: number
 *           description: Number of credits for the course
 *         Catalog_no:
 *           type: string
 *           description: Catalog number for the course
 *         Academic_yr:
 *           type: number
 *           description: Academic year associated with the course
 */

/**
 * @swagger
 * /api/course:
 *   post:
 *     summary: Create a new course
 *     tags: [Course]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       201:
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Validation error
 *
 *   get:
 *     summary: Get all courses
 *     tags: [Course]
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
 *         description: List of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Course'
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
 * /api/course/{id}:
 *   get:
 *     summary: Get course by ID
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Course details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Course not found
 *
 *   put:
 *     summary: Update course
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Course_name:
 *                 type: string
 *               Credits:
 *                 type: number
 *     responses:
 *       200:
 *         description: Course updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Course not found
 *
 *   delete:
 *     summary: Delete course
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     responses:
 *       204:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 */

// Routes
router.post("/api/course", authMiddleware, courseController.createCourse); // Create a new course
router.get("/api/course", authMiddleware, courseController.getAllCourses); // Retrieve all courses
router.get("/api/course/:id", authMiddleware, courseController.getCourseById); // Retrieve a specific course by ID
router.put("/api/course/:id", authMiddleware, courseController.updateCourse); // Update a course by ID
router.delete("/api/course/:id", authMiddleware, courseController.deleteCourse); // Delete a course by ID

export default router;
