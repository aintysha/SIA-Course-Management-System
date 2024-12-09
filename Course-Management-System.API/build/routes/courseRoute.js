"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCourse = void 0;
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("joi")); // Import Joi validation library
const authMiddleware_1 = require("../middleware/authMiddleware");
// Initialize express Router
const router = express_1.default.Router();
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
 *           type: integer
 *           description: The unique identifier for the course
 *           example: 101
 *         Course_name:
 *           type: string
 *           maxLength: 100
 *           description: The name of the course
 *           example: "Introduction to Computer Science"
 *         Credits:
 *           type: integer
 *           description: The number of credits for the course
 *           example: 3
 *         Catalog_no:
 *           type: string
 *           maxLength: 50
 *           description: The catalog number for the course
 *           example: "CS101"
 *         Academic_yr:
 *           type: integer
 *           description: The academic year for the course
 *           example: 2024
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message
 *         details:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               path:
 *                 type: array
 *                 items:
 *                   type: string
 */
// Define the course validation schema with Joi
const courseValidationSchema = joi_1.default.object({
    Course_ID: joi_1.default.number()
        .integer()
        .required()
        .messages({
        "number.base": "Course_ID must be a number",
        "any.required": "Course_ID is required",
    }),
    Course_name: joi_1.default.string()
        .max(100)
        .required()
        .messages({
        "string.max": "Course name cannot exceed 100 characters",
        "any.required": "Course name is required",
    }),
    Credits: joi_1.default.number()
        .integer()
        .positive()
        .required()
        .messages({
        "number.base": "Credits must be a number",
        "number.positive": "Credits must be a positive number",
        "any.required": "Credits are required",
    }),
    Catalog_no: joi_1.default.string()
        .max(50)
        .required()
        .messages({
        "string.max": "Catalog number cannot exceed 50 characters",
        "any.required": "Catalog number is required",
    }),
    Academic_yr: joi_1.default.number()
        .integer()
        .positive()
        .required()
        .messages({
        "number.base": "Academic year must be a number",
        "number.positive": "Academic year must be a positive number",
        "any.required": "Academic year is required",
    }),
});
// Helper function to validate course data
const validateCourse = (courseData) => {
    return courseValidationSchema.validate(courseData, { abortEarly: false });
};
exports.validateCourse = validateCourse;
// Mock Course Controller (for demonstration)
class CourseController {
    // Method to create a new course
    createCourse(req, res) {
        const validationResult = (0, exports.validateCourse)(req.body);
        if (validationResult.error) {
            return res.status(400).json({
                message: "Validation error",
                details: validationResult.error.details,
            });
        }
        // Simulate course creation
        return res.status(201).json({
            message: "Course created successfully",
            data: req.body,
        });
    }
    // Method to get all courses
    getAllCourses(req, res) {
        // Simulate fetching courses
        const courses = [
            {
                Course_ID: 101,
                Course_name: "Introduction to Computer Science",
                Credits: 3,
                Catalog_no: "CS101",
                Academic_yr: 2024,
            },
        ];
        return res.status(200).json({ data: courses });
    }
    // Method to get a course by ID
    getCourseById(req, res) {
        const courseId = req.params.id;
        // Simulate fetching course by ID
        if (courseId === "101") {
            return res.status(200).json({
                Course_ID: 101,
                Course_name: "Introduction to Computer Science",
                Credits: 3,
                Catalog_no: "CS101",
                Academic_yr: 2024,
            });
        }
        return res.status(404).json({ message: "Course not found" });
    }
    // Method to update a course
    updateCourse(req, res) {
        const courseId = req.params.id;
        const validationResult = (0, exports.validateCourse)(req.body);
        if (validationResult.error) {
            return res.status(400).json({
                message: "Validation error",
                details: validationResult.error.details,
            });
        }
        // Simulate updating the course
        if (courseId === "101") {
            return res.status(200).json({
                message: "Course updated successfully",
                data: req.body,
            });
        }
        return res.status(404).json({ message: "Course not found" });
    }
    // Method to delete a course
    deleteCourse(req, res) {
        const courseId = req.params.id;
        if (courseId === "101") {
            return res.status(204).send();
        }
        return res.status(404).json({ message: "Course not found" });
    }
}
// Create an instance of the CourseController
const courseController = new CourseController();
/**
 * @swagger
 * /api/courses:
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *
 *   get:
 *     summary: Get all courses
 *     tags: [Course]
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
 *
 * /api/courses/{id}:
 *   get:
 *     summary: Get course by ID
 *     tags: [Course]
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
 *             $ref: '#/components/schemas/Course'
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
// Course Routes:
// POST /api/courses
router.post("/", authMiddleware_1.authMiddleware, courseController.createCourse);
// GET /api/courses
router.get("/", authMiddleware_1.authMiddleware, courseController.getAllCourses);
// GET /api/courses/:id
router.get("/:id", authMiddleware_1.authMiddleware, courseController.getCourseById);
// PUT /api/courses/:id
router.put("/:id", authMiddleware_1.authMiddleware, courseController.updateCourse);
// DELETE /api/courses/:id
router.delete("/:id", authMiddleware_1.authMiddleware, courseController.deleteCourse);
// Export the router for use in main application
exports.default = router;
