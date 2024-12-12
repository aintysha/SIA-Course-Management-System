import Joi from "joi"; // Import Joi validation library

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
 *           example: 101
 *         Course_name:
 *           type: string
 *           description: Name of the course
 *           example: "Introduction to Programming"
 *         Credits:
 *           type: number
 *           description: Number of credits for the course
 *           example: 3
 *         Catalog_no:
 *           type: string
 *           description: Catalog number of the course
 *           example: "CS101"
 *         Academic_yr:
 *           type: number
 *           description: Academic year for the course offering
 *           example: 2024
 *     
 *     
 *     
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

// Define a validation schema for course data
const courseValidationSchema = Joi.object({
  // Course ID validation
  // - Must be a positive number
  // - Required field
  Course_ID: Joi.number().positive().required().messages({
    "number.base": "Course ID must be a number",
    "number.positive": "Course ID must be a positive number",
    "any.required": "Course ID is required",
  }),

  // Course name validation
  // - Maximum 200 characters
  // - Required field
  Course_name: Joi.string().max(200).required().messages({
    "string.base": "Course name must be a string",
    "string.max": "Course name cannot exceed 200 characters",
    "any.required": "Course name is required",
  }),

  // Credits validation
  // - Must be a positive number
  // - Required field
  Credits: Joi.number().positive().required().messages({
    "number.base": "Credits must be a number",
    "number.positive": "Credits must be a positive number",
    "any.required": "Credits are required",
  }),

  // Catalog number validation
  // - Maximum 20 characters
  // - Required field
  Catalog_no: Joi.string().max(20).required().messages({
    "string.base": "Catalog number must be a string",
    "string.max": "Catalog number cannot exceed 20 characters",
    "any.required": "Catalog number is required",
  }),

  // Academic year validation
  // - Must be a valid number
  // - Required field
  Academic_yr: Joi.number().integer().min(1900).max(2100).required().messages({
    "number.base": "Academic year must be a valid number",
    "number.integer": "Academic year must be an integer",
    "number.min": "Academic year cannot be earlier than 1900",
    "number.max": "Academic year cannot be later than 2100",
    "any.required": "Academic year is required",
  }),
});

// Helper function to validate course data
export const validateCourse = (courseData: any) => {
  return courseValidationSchema.validate(courseData, { abortEarly: false });
};
