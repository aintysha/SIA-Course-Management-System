import Joi from "joi"; // Import Joi validation library

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
 *           description: Unique identifier for the grade record
 *           example: 101
 *         Student_ID:
 *           type: number
 *           description: Unique identifier for the student
 *           example: 1001
 *         Subj_desc:
 *           type: string
 *           description: Description of the subject
 *           example: "Introduction to Data Structures"
 *         Units:
 *           type: number
 *           description: Number of units for the subject
 *           example: 3
 *         Credits:
 *           type: number
 *           description: Number of credits for the subject
 *           example: 3
 *         Remarks:
 *           type: string
 *           description: Remarks or comments for the grade
 *           example: "Passed with Distinction"
 *     GradeResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Grade record's unique identifier
 *         Grade_ID:
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

// Define a validation schema for grade data
const gradeValidationSchema = Joi.object({
  // Grade ID validation
  // - Must be a positive number
  // - Required field
  Grade_ID: Joi.number().positive().required().messages({
    "number.base": "Grade ID must be a number",
    "number.positive": "Grade ID must be a positive number",
    "any.required": "Grade ID is required",
  }),

  // Student ID validation
  // - Must be a positive number
  // - Required field
  Student_ID: Joi.number().positive().required().messages({
    "number.base": "Student ID must be a number",
    "number.positive": "Student ID must be a positive number",
    "any.required": "Student ID is required",
  }),

  // Subject description validation
  // - Maximum 300 characters
  // - Required field
  Subj_desc: Joi.string().max(300).required().messages({
    "string.base": "Subject description must be a string",
    "string.max": "Subject description cannot exceed 300 characters",
    "any.required": "Subject description is required",
  }),

  // Units validation
  // - Must be a positive number
  // - Required field
  Units: Joi.number().positive().required().messages({
    "number.base": "Units must be a number",
    "number.positive": "Units must be a positive number",
    "any.required": "Units are required",
  }),

  // Credits validation
  // - Must be a positive number
  // - Required field
  Credits: Joi.number().positive().required().messages({
    "number.base": "Credits must be a number",
    "number.positive": "Credits must be a positive number",
    "any.required": "Credits are required",
  }),

  // Remarks validation
  // - Maximum 500 characters
  // - Optional field
  Remarks: Joi.string().max(500).optional().messages({
    "string.base": "Remarks must be a string",
    "string.max": "Remarks cannot exceed 500 characters",
  }),
});

// Helper function to validate grade data
export const validateGrade = (gradeData: any) => {
  return gradeValidationSchema.validate(gradeData, { abortEarly: false });
};
