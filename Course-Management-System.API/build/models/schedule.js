"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schedule = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Define the schema for the Schedule model
const scheduleSchema = new mongoose_1.Schema({
    // Schedule ID - required, unique, and of type Number
    Schedule_ID: { type: Number, required: true, unique: true },
    // Course ID - required and of type Number (can reference a Course model)
    Course_ID: { type: Number, required: true },
    // Days of the week when the class is scheduled - required and of type String
    Days: { type: String, required: true, length: 50 },
    // Class time - required and stored as a Date
    Class_time: { type: Date, required: true },
    // Location where the class will take place - required and of type String
    Location: { type: String, required: true, length: 100 },
    // Lecture duration in hours - required and of type Number
    Lecture: { type: Number, required: true },
    // Laboratory duration in hours - required and of type Number
    Laboratory: { type: Number, required: true },
}, 
// Enable automatic timestamp fields (createdAt and updatedAt)
{ timestamps: true });
// Create and export the Schedule model
exports.Schedule = mongoose_1.default.model('Schedules', scheduleSchema);
