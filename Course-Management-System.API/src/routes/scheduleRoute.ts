import express from "express";
import { ScheduleController } from "../controllers/scheduleController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
const scheduleController = new ScheduleController();

/**
 * @swagger
 * tags:
 *   name: Schedule
 *   description: Schedule endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Schedule:
 *       type: object
 *       required:
 *         - Schedule_ID
 *         - Course_ID
 *         - Teacher
 *         - Days
 *         - Class_time
 *         - Room
 *         - Lecture
 *         - Laboratory
 *         - Units
 *       properties:
 *         Schedule_ID:
 *           type: number
 *           description: Unique identifier for the schedule
 *         Course_ID:
 *           type: number
 *           description: Unique identifier for the course
 *         Teacher:
 *           type: string
 *           description: Name of the teacher
 *         Days:
 *           type: string
 *           description: Days when the class is held
 *         Class_time:
 *           type: string
 *           description: Time when the class is held
 *         Room:
 *           type: string
 *           description: Classroom where the class is held
 *         Lecture:
 *           type: number
 *           description: Number of lecture hours
 *         Laboratory:
 *           type: number
 *           description: Number of laboratory hours
 *         Units:
 *           type: number
 *           description: Number of units for the course
 */

/**
 * @swagger
 * /api/schedule:
 *   post:
 *     summary: Create a new schedule
 *     tags: [Schedule]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Schedule'
 *     responses:
 *       201:
 *         description: Schedule created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Schedule'
 *       400:
 *         description: Validation error
 *
 *   get:
 *     summary: Get all schedules
 *     tags: [Schedule]
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
 *         description: List of schedules
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Schedule'
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
 * /api/schedule/{id}:
 *   get:
 *     summary: Get schedule by ID
 *     tags: [Schedule]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Schedule ID
 *     responses:
 *       200:
 *         description: Schedule details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Schedule'
 *       404:
 *         description: Schedule not found
 *
 *   put:
 *     summary: Update schedule
 *     tags: [Schedule]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Schedule ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Teacher:
 *                 type: string
 *               Days:
 *                 type: string
 *               Class_time:
 *                 type: string
 *               Room:
 *                 type: string
 *               Lecture:
 *                 type: number
 *               Laboratory:
 *                 type: number
 *               Units:
 *                 type: number
 *     responses:
 *       200:
 *         description: Schedule updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Schedule'
 *       404:
 *         description: Schedule not found
 *
 *   delete:
 *     summary: Delete schedule
 *     tags: [Schedule]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Schedule ID
 *     responses:
 *       204:
 *         description: Schedule deleted successfully
 *       404:
 *         description: Schedule not found
 */

// Routes

router.post("/api/schedule", authMiddleware, scheduleController.createSchedule); // Create a new schedule
router.get("/api/schedule", authMiddleware, scheduleController.getAllSchedules); // Retrieve all schedules
router.get("/api/schedule/:id", authMiddleware, scheduleController.getScheduleById); // Retrieve a specific schedule by ID
router.put("/api/schedule/:id", authMiddleware, scheduleController.updateSchedule); // Update a schedule by ID
router.delete("/api/schedule/:id", authMiddleware, scheduleController.deleteSchedule); // Delete a schedule by ID

export default router;
