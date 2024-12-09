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
exports.Grade = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Define the schema for the Grade model
const gradeSchema = new mongoose_1.Schema({
    // Grade ID - required, unique, and of type Number
    Grade_ID: { type: Number, required: true, unique: true },
    // Student ID - required and of type Number
    Student_ID: { type: Number, required: true },
    // Subject description - required and of type String
    Subj_desc: { type: String, required: true, maxlength: 200 },
    // Units - required and of type Number
    Units: { type: Number, required: true },
    // Credits - required and of type Number
    Credits: { type: Number, required: true },
    // Remarks - optional field, string type
    Remarks: { type: String, maxlength: 500 },
}, 
// Enable automatic timestamp fields (createdAt and updatedAt)
{ timestamps: true });
// Create and export the Grade model
exports.Grade = mongoose_1.default.model('Grades', gradeSchema);
