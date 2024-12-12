/*import { Request, Response } from "express";
import { Grade } from "../models/grade";
import { IGrade } from "../interfaces/gradeInterface";
import mongoose from "mongoose";
import { validateGrade } from "../validations/gradeValidation";

export class GradeController {
  // Create a new grade
  // Handles POST requests to create a new grade in the database
  public async createGrade(req: Request, res: Response): Promise<void> {
    try {
      // Validate incoming grade data against schema rules
      const { error, value: payload } = validateGrade(req.body);
      if (error) {
        // Return early if validation fails, sending back specific error messages
        res
          .status(400)
          .json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Prepare grade data with a new MongoDB ID
      const gradeData: IGrade = {
        _id: new mongoose.Types.ObjectId(),
        ...payload,
      };

      // Create and save the new grade to the database
      const grade = new Grade(gradeData);
      const savedGrade = await grade.save();

      // Return the newly created grade with 201 Created status
      res.status(201).json(savedGrade);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all grades
  // Handles GET requests to retrieve all grades from the database
  public async getAllGrades(req: Request, res: Response): Promise<void> {
    try {
      // Fetch all grades from the database
      const grades: IGrade[] = await Grade.find();
      res.json(grades);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get grade by ID
  // Handles GET requests to retrieve a specific grade by its ID
  public async getGradeById(req: Request, res: Response): Promise<void> {
    try {
      // Attempt to find grade by ID
      const grade: IGrade | null = await Grade.findById(req.params.id);

      // Return 404 if grade doesn't exist
      if (!grade) {
        res.status(404).json({ message: "Grade not found" });
        return;
      }

      // Return the found grade
      res.json(grade);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update grade
  // Handles PUT/PATCH requests to update an existing grade
  public async updateGrade(req: Request, res: Response): Promise<void> {
    try {
      // Validate the updated grade data
      const { error, value: payload } = validateGrade(req.body);
      if (error) {
        res
          .status(400)
          .json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Update the grade and get the updated document
      const grade: IGrade | null = await Grade.findByIdAndUpdate(
        req.params.id,
        payload,
        { new: true } // This option returns the modified document rather than the original
      );

      // Return 404 if grade doesn't exist
      if (!grade) {
        res.status(404).json({ message: "Grade not found" });
        return;
      }

      // Return the updated grade
      res.json(grade);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete grade
  // Handles DELETE requests to remove a grade from the database
  public async deleteGrade(req: Request, res: Response): Promise<void> {
    try {
      // Attempt to find and delete the grade in one operation
      const grade: IGrade | null = await Grade.findByIdAndDelete(req.params.id);

      // Return 404 if grade doesn't exist
      if (!grade) {
        res.status(404).json({ message: "Grade not found" });
        return;
      }

      // Confirm successful deletion
      res.json({ message: "Grade deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
*/