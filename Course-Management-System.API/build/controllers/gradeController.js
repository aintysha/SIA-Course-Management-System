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
exports.GradeController = void 0;
const grade_1 = require("../models/grade");
const mongoose_1 = __importDefault(require("mongoose"));
const gradeValidation_1 = require("../validations/gradeValidation");
class GradeController {
    // Create a new grade
    createGrade(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate incoming grade data
                const { error, value: payload } = (0, gradeValidation_1.validateGrade)(req.body); // Use appropriate validation function for Grade schema
                if (error) {
                    res.status(400).json({ message: error.details.map((err) => err.message) });
                    return;
                }
                // Prepare grade data
                const gradeData = Object.assign({ _id: new mongoose_1.default.Types.ObjectId() }, payload);
                // Create and save the new grade to the database
                const grade = new grade_1.Grade(gradeData);
                const savedGrade = yield grade.save();
                // Return the newly created grade with 201 Created status
                res.status(201).json(savedGrade);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    // Get all grades
    getAllGrades(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch all grades from database
                const grades = yield grade_1.Grade.find();
                res.json(grades);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    // Get grade by ID
    getGradeById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const grade = yield grade_1.Grade.findById(req.params.id);
                // Return 404 if grade doesn't exist
                if (!grade) {
                    res.status(404).json({ message: "Grade not found" });
                    return;
                }
                res.json(grade);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    // Update grade
    updateGrade(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error, value: payload } = (0, gradeValidation_1.validateGrade)(req.body); // Use appropriate validation function for Grade schema
                if (error) {
                    res.status(400).json({ message: error.details.map((err) => err.message) });
                    return;
                }
                // Prepare update data
                const gradeData = Object.assign({}, payload);
                // Update the grade and get the updated document
                const grade = yield grade_1.Grade.findByIdAndUpdate(req.params.id, gradeData, { new: true } // Returns the updated document
                );
                // Return 404 if grade doesn't exist
                if (!grade) {
                    res.status(404).json({ message: "Grade not found" });
                    return;
                }
                res.json(grade);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    // Delete grade
    deleteGrade(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Attempt to find and delete the grade in one operation
                const grade = yield grade_1.Grade.findByIdAndDelete(req.params.id);
                // Return 404 if grade doesn't exist
                if (!grade) {
                    res.status(404).json({ message: "Grade not found" });
                    return;
                }
                // Confirm successful deletion
                res.json({ message: "Grade deleted successfully" });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.GradeController = GradeController;
