"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchedule = void 0;
const joi_1 = __importDefault(require("joi")); // Import Joi validation library
/**
 * @swagger
 * components:
 *   schemas:
 *     Schedule:
 *       type: object
 *       required:
 *         - Schedule_ID
 *         - Course_ID
 *         - Days
 *         - Class_time
 *         - Location
 *         - Lecture
 *         - Laboratory
 *       properties:
 *         Schedule_ID:
 *           type: integer
 *           description: The unique identifier for the schedule
 *           example: 1001
 *         Course_ID:
 *           type: integer
 *           description: The unique identifier for the course
 *           example: 101
 *         Days:
 *           type: string
 *           description: Days of the week when the class is scheduled
 *           example: "Monday, Wednesday, Friday"
 *         Class_time:
 *           type: string
 *           format: date-time
 *           description: The date and time when the class is scheduled
 *           example: "2024-08-15T09:00:00Z"
 *         Location:
 *           type: string
 *           description: Location where the class will take place
 *           example: "Room 101, Building A"
 *         Lecture:
 *           type: integer
 *           description: Number of lecture hours per week
 *           example: 3
 *         Laboratory:
 *           type: integer
 *           description: Number of laboratory hours per week
 *           example: 2
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
// Define a validation schema for schedule data
const scheduleValidationSchema = joi_1.default.object({
    // Schedule ID validation
    // - Must be a number
    // - Required field
    Schedule_ID: joi_1.default.number()
        .integer()
        .required()
        .messages({
        "number.base": "Schedule_ID must be a number",
        "any.required": "Schedule_ID is required",
    }),
    // Course ID validation
    // - Must be a number
    // - Required field
    Course_ID: joi_1.default.number()
        .integer()
        .required()
        .messages({
        "number.base": "Course_ID must be a number",
        "any.required": "Course_ID is required",
    }),
    // Days validation
    // - Must be a string (ideally a comma-separated list of days)
    // - Required field
    Days: joi_1.default.string()
        .required()
        .messages({
        "string.base": "Days must be a string",
        "any.required": "Days are required",
    }),
    // Class time validation
    // - Must be a valid ISO 8601 date string
    // - Required field
    Class_time: joi_1.default.date()
        .iso()
        .required()
        .messages({
        "date.base": "Class_time must be a valid date",
        "any.required": "Class_time is required",
    }),
    // Location validation
    // - Must be a string
    // - Required field
    Location: joi_1.default.string()
        .required()
        .messages({
        "string.base": "Location must be a string",
        "any.required": "Location is required",
    }),
    // Lecture validation
    // - Must be a positive integer
    // - Required field
    Lecture: joi_1.default.number()
        .integer()
        .positive()
        .required()
        .messages({
        "number.base": "Lecture hours must be a number",
        "number.positive": "Lecture hours must be a positive number",
        "any.required": "Lecture hours are required",
    }),
    // Laboratory validation
    // - Must be a positive integer
    // - Required field
    Laboratory: joi_1.default.number()
        .integer()
        .positive()
        .required()
        .messages({
        "number.base": "Laboratory hours must be a number",
        "number.positive": "Laboratory hours must be a positive number",
        "any.required": "Laboratory hours are required",
    }),
});
// Helper function to validate schedule data
// - Takes schedule data as input
// - Returns validation result with all errors (abortEarly: false)
// - Type 'any' is used for scheduleData as it's raw input that needs validation
const validateSchedule = (scheduleData) => {
    return scheduleValidationSchema.validate(scheduleData, { abortEarly: false });
};
exports.validateSchedule = validateSchedule;
