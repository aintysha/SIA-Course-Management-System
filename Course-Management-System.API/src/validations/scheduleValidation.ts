import Joi from "joi"; // Import Joi validation library

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
 *           example: 2024
 *         Course_ID:
 *           type: number
 *           description: Unique identifier for the course
 *           example: 101
 *         Teacher:
 *           type: string
 *           description: Name of the teacher
 *           example: "Dr. John Doe"
 *         Days:
 *           type: string
 *           description: Days of the week the class is scheduled
 *           example: "MWF"
 *         Class_time:
 *           type: string
 *           description: Time the class is scheduled (e.g., "10:00 AM - 12:00 PM")
 *           example: "10:00 AM - 12:00 PM"
 *         Room:
 *           type: string
 *           description: Room number where the class takes place
 *           example: "Room 101"
 *         Lecture:
 *           type: number
 *           description: Number of lecture hours per week
 *           example: 3
 *         Laboratory:
 *           type: number
 *           description: Number of laboratory hours per week
 *           example: 1
 *         Units:
 *           type: number
 *           description: Number of units for the course schedule
 *           example: 4
 *     ScheduleResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Schedule's unique identifier
 *         Schedule_ID:
 *           type: number
 *         createdAt:
 *           type: string
 *           format: date-time
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
const scheduleValidationSchema = Joi.object({
  // Schedule ID validation
  // - Must be a positive number
  // - Required field
  Schedule_ID: Joi.number().positive().required().messages({
    "number.base": "Schedule ID must be a number",
    "number.positive": "Schedule ID must be a positive number",
    "any.required": "Schedule ID is required",
  }),

  // Course ID validation
  // - Must be a positive number
  // - Required field
  Course_ID: Joi.number().positive().required().messages({
    "number.base": "Course ID must be a number",
    "number.positive": "Course ID must be a positive number",
    "any.required": "Course ID is required",
  }),

  // Teacher validation
  // - Maximum 100 characters
  // - Required field
  Teacher: Joi.string().max(100).required().messages({
    "string.base": "Teacher name must be a string",
    "string.max": "Teacher name cannot exceed 100 characters",
    "any.required": "Teacher name is required",
  }),

  // Days validation
  // - Maximum 20 characters
  // - Required field
  Days: Joi.string().max(20).required().messages({
    "string.base": "Days must be a string",
    "string.max": "Days cannot exceed 20 characters",
    "any.required": "Days is required",
  }),

  // Class time validation
  // - Maximum 50 characters
  // - Required field
  Class_time: Joi.string().max(50).required().messages({
    "string.base": "Class time must be a string",
    "string.max": "Class time cannot exceed 50 characters",
    "any.required": "Class time is required",
  }),

  // Room validation
  // - Maximum 20 characters
  // - Required field
  Room: Joi.string().max(20).required().messages({
    "string.base": "Room must be a string",
    "string.max": "Room cannot exceed 20 characters",
    "any.required": "Room is required",
  }),

  // Lecture validation
  // - Must be a non-negative number
  // - Required field
  Lecture: Joi.number().integer().min(0).required().messages({
    "number.base": "Lecture must be a number",
    "number.min": "Lecture cannot be negative",
    "any.required": "Lecture is required",
  }),

  // Laboratory validation
  // - Must be a non-negative number
  // - Required field
  Laboratory: Joi.number().integer().min(0).required().messages({
    "number.base": "Laboratory must be a number",
    "number.min": "Laboratory cannot be negative",
    "any.required": "Laboratory is required",
  }),

  // Units validation
  // - Must be a positive number
  // - Required field
  Units: Joi.number().positive().required().messages({
    "number.base": "Units must be a number",
    "number.positive": "Units must be a positive number",
    "any.required": "Units are required",
  }),
});

// Helper function to validate schedule data
export const validateSchedule = (scheduleData: any) => {
  return scheduleValidationSchema.validate(scheduleData, { abortEarly: false });
};
