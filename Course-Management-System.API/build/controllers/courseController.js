"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const course_1 = require("../models/course");
const mongoose_1 = __importDefault(require("mongoose"));
const courseValidation_1 = require("../validations/courseValidation");
class CourseController {
    // Create a new course
    // Handles POST requests to create a new course in the database
    createCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate incoming course data against schema rules
                const { error, value: payload } = (0, courseValidation_1.validateCourse)(req.body);
                if (error) {
                    // Return early if validation fails, sending back specific error messages
                    res
                        .status(400)
                        .json({ message: error.details.map((err) => err.message) });
                    return;
                }
                // Prepare course data with a new MongoDB ID
                const courseData = Object.assign({ _id: new mongoose_1.default.Types.ObjectId() }, payload);
                // Create and save the new course to the database
                const course = new course_1.Course(courseData);
                const savedCourse = yield course.save();
                // Return the newly created course with 201 Created status
                res.status(201).json(savedCourse);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    // Get all courses
    // Handles GET requests to retrieve all courses from the database
    getAllCourses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch all courses from database
                const courses = yield course_1.Course.find();
                res.json(courses);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    // Get course by ID
    // Handles GET requests to retrieve a specific course by its ID
    getCourseById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Attempt to find course by ID
                const course = yield course_1.Course.findById(req.params.id);
                // Return 404 if course doesn't exist
                if (!course) {
                    res.status(404).json({ message: "Course not found" });
                    return;
                }
                // Return the found course
                res.json(course);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    // Update course
    // Handles PUT/PATCH requests to update an existing course
    updateCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate the updated course data
                const { error, value: payload } = (0, courseValidation_1.validateCourse)(req.body);
                if (error) {
                    res
                        .status(400)
                        .json({ message: error.details.map((err) => err.message) });
                    return;
                }
                // Prepare update data
                const courseData = Object.assign({}, payload);
                // Update the course and get the updated document
                const course = yield course_1.Course.findByIdAndUpdate(req.params.id, courseData, {
                    new: true, // This option returns the modified document rather than the original
                });
                // Return 404 if course doesn't exist
                if (!course) {
                    res.status(404).json({ message: "Course not found" });
                    return;
                }
                // Return the updated course
                res.json(course);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    // Delete course
    // Handles DELETE requests to remove a course from the database
    deleteCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Attempt to find and delete the course in one operation
                const course = yield course_1.Course.findByIdAndDelete(req.params.id);
                // Return 404 if course doesn't exist
                if (!course) {
                    res.status(404).json({ message: "Course not found" });
                    return;
                }
                // Confirm successful deletion
                res.json({ message: "Course deleted successfully" });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.CourseController = CourseController;
