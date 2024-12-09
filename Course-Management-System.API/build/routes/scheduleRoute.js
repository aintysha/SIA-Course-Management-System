"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const scheduleController_1 = require("../controllers/scheduleController");
const authMiddleware_1 = require("../middleware/authMiddleware");
// Initialize express Router
const router = express_1.default.Router();
// Create instance of ScheduleController to handle route logic
const scheduleController = new scheduleController_1.ScheduleController();
/**
 * @swagger
 * tags:
 *   name: Schedule
 *   description:  Schedule endpoints
 */
/**
 * @swagger
 * /api/schedules:
 *   post:
 *     summary: Create a new  schedule
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
 *               $ref: '#/components/schemas/ScheduleResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *
 *   get:
 *     summary: Get all  schedules
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
 *         description: List of  schedules
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ScheduleResponse'
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
 * /api/schedules/{id}:
 *   get:
 *     summary: Get  schedule by ID
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
 *         description:  schedule details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ScheduleResponse'
 *       404:
 *         description: Schedule not found
 *
 *   put:
 *     summary: Update  schedule
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
 *               Course_ID:
 *                 type: number
 *               Days:
 *                 type: string
 *               Class_time:
 *                 type: string
 *                 format: date-time
 *               Location:
 *                 type: string
 *               Lecture:
 *                 type: number
 *               Laboratory:
 *                 type: number
 *     responses:
 *       200:
 *         description:  schedule updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ScheduleResponse'
 *       404:
 *         description: Schedule not found
 *
 *   delete:
 *     summary: Delete  schedule
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
/**
 * @swagger
 * /api/schedules/profile:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get  schedule profile
 *     tags: [Schedule]
 *     responses:
 *       200:
 *         description:  schedule profile retrieved successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
// Schedule Routes:
// POST /api/schedules
// Creates a new  schedule
// Request body should contain schedule details (Course_ID, Days, Class_time, Location, Lecture, Laboratory)
router.post("/api/schedules", authMiddleware_1.authMiddleware, scheduleController.createSchedule);
// GET /api/schedules
// Retrieves all  schedules from the database
// Returns array of schedules
router.get("/api/schedules", authMiddleware_1.authMiddleware, scheduleController.getAllSchedules);
// GET /api/schedules/:id
// Retrieves a specific  schedule by its ID
// :id -  Schedule ID
router.get("/api/schedules:id", authMiddleware_1.authMiddleware, scheduleController.getScheduleById);
// PUT /api/schedules/:id
// Updates an existing  schedule's information
// :id -  Schedule ID
// Request body should contain updated schedule details
router.put("/api/schedules:id", authMiddleware_1.authMiddleware, scheduleController.updateSchedule);
// DELETE /api/schedules/:id
// Removes a  schedule from the database
// :id -  Schedule ID
router.delete("/api/schedules:id", authMiddleware_1.authMiddleware, scheduleController.deleteSchedule);
// Export the router for use in main application
exports.default = router;
