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
exports.Course = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Define the schema for the Course model
const courseSchema = new mongoose_1.Schema({
    // Course ID - required, unique, and of type Number
    Course_ID: { type: Number, required: true, unique: true },
    // Course name - required and of type String
    Course_name: { type: String, required: true, length: 100 },
    // Credits - required and of type Number
    Credits: { type: Number, required: true },
    // Catalog number - required and of type String
    Catalog_no: { type: String, required: true, length: 50 },
    // Academic year - required and of type Number
    Academic_yr: { type: Number, required: true },
}, 
// Enable automatic timestamp fields (createdAt and updatedAt)
{ timestamps: true });
// Create and export the Course model
exports.Course = mongoose_1.default.model('Courses', courseSchema);
