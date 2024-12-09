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
exports.ScheduleController = void 0;
const schedule_1 = require("../models/schedule"); // Assuming the model is named Schedule
const mongoose_1 = __importDefault(require("mongoose"));
const scheduleValidation_1 = require("../validations/scheduleValidation"); // Assuming validation logic exists for schedules
class ScheduleController {
    // Create a new schedule record
    // Handles POST requests to create a new schedule in the database
    createSchedule(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate incoming schedule data against schema rules
                const { error, value: payload } = (0, scheduleValidation_1.validateSchedule)(req.body);
                if (error) {
                    // Return early if validation fails, sending back specific error messages
                    res
                        .status(400)
                        .json({ message: error.details.map((err) => err.message) });
                    return;
                }
                // Prepare schedule data with a new MongoDB ID
                const scheduleData = Object.assign({ _id: new mongoose_1.default.Types.ObjectId() }, payload);
                // Create and save the new schedule to the database
                const schedule = new schedule_1.Schedule(scheduleData);
                const savedSchedule = yield schedule.save();
                // Return the newly created schedule with 201 Created status
                res.status(201).json(savedSchedule);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    // Get all schedule records
    // Handles GET requests to retrieve all schedules from the database
    getAllSchedules(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch all schedules from database
                const schedules = yield schedule_1.Schedule.find();
                res.json(schedules);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    // Get schedule by ID
    // Handles GET requests to retrieve a specific schedule by its ID
    getScheduleById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Attempt to find schedule by ID
                const schedule = yield schedule_1.Schedule.findById(req.params.id);
                // Return 404 if schedule doesn't exist
                if (!schedule) {
                    res.status(404).json({ message: "Schedule not found" });
                    return;
                }
                // Return the found schedule
                res.json(schedule);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    // Update schedule record
    // Handles PUT/PATCH requests to update an existing schedule
    updateSchedule(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate the updated schedule data
                const { error, value: payload } = (0, scheduleValidation_1.validateSchedule)(req.body);
                if (error) {
                    res
                        .status(400)
                        .json({ message: error.details.map((err) => err.message) });
                    return;
                }
                // Prepare update data
                const scheduleData = Object.assign({}, payload);
                // Update the schedule and get the updated document
                const schedule = yield schedule_1.Schedule.findByIdAndUpdate(req.params.id, scheduleData, {
                    new: true, // This option returns the modified document rather than the original
                });
                // Return 404 if schedule doesn't exist
                if (!schedule) {
                    res.status(404).json({ message: "Schedule not found" });
                    return;
                }
                // Return the updated schedule
                res.json(schedule);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    // Delete schedule record
    // Handles DELETE requests to remove a schedule from the database
    deleteSchedule(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Attempt to find and delete the schedule in one operation
                const schedule = yield schedule_1.Schedule.findByIdAndDelete(req.params.id);
                // Return 404 if schedule doesn't exist
                if (!schedule) {
                    res.status(404).json({ message: "Schedule not found" });
                    return;
                }
                // Confirm successful deletion
                res.json({ message: "Schedule deleted successfully" });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.ScheduleController = ScheduleController;
