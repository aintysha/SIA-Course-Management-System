import { Request, Response } from "express";
import { Schedule } from "../models/schedule";
import { ISchedule } from "../interfaces/scheduleInterface";
import mongoose from "mongoose";
import { validateSchedule } from "../validations/scheduleValidation";

export class ScheduleController {
  // Create a new schedule
  // Handles POST requests to create a new schedule in the database
  public async createSchedule(req: Request, res: Response): Promise<void> {
    try {
      // Validate incoming schedule data against schema rules
      const { error, value: payload } = validateSchedule(req.body);
      if (error) {
        // Return early if validation fails, sending back specific error messages
        res
          .status(400)
          .json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Prepare schedule data with a new MongoDB ID
      const scheduleData: ISchedule = {
        _id: new mongoose.Types.ObjectId(),
        ...payload,
      };

      // Create and save the new schedule to the database
      const schedule = new Schedule(scheduleData);
      const savedSchedule = await schedule.save();

      // Return the newly created schedule with 201 Created status
      res.status(201).json(savedSchedule);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all schedules
  // Handles GET requests to retrieve all schedules from the database
  public async getAllSchedules(req: Request, res: Response): Promise<void> {
    try {
      // Fetch all schedules from the database
      const schedules: ISchedule[] = await Schedule.find();
      res.json(schedules);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get schedule by ID
  // Handles GET requests to retrieve a specific schedule by its ID
  public async getScheduleById(req: Request, res: Response): Promise<void> {
    try {
      // Attempt to find schedule by ID
      const schedule: ISchedule | null = await Schedule.findById(req.params.id);

      // Return 404 if schedule doesn't exist
      if (!schedule) {
        res.status(404).json({ message: "Schedule not found" });
        return;
      }

      // Return the found schedule
      res.json(schedule);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update schedule
  // Handles PUT/PATCH requests to update an existing schedule
  public async updateSchedule(req: Request, res: Response): Promise<void> {
    try {
      // Validate the updated schedule data
      const { error, value: payload } = validateSchedule(req.body);
      if (error) {
        res
          .status(400)
          .json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Update the schedule and get the updated document
      const schedule: ISchedule | null = await Schedule.findByIdAndUpdate(
        req.params.id,
        payload,
        { new: true } // This option returns the modified document rather than the original
      );

      // Return 404 if schedule doesn't exist
      if (!schedule) {
        res.status(404).json({ message: "Schedule not found" });
        return;
      }

      // Return the updated schedule
      res.json(schedule);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete schedule
  // Handles DELETE requests to remove a schedule from the database
  public async deleteSchedule(req: Request, res: Response): Promise<void> {
    try {
      // Attempt to find and delete the schedule in one operation
      const schedule: ISchedule | null = await Schedule.findByIdAndDelete(req.params.id);

      // Return 404 if schedule doesn't exist
      if (!schedule) {
        res.status(404).json({ message: "Schedule not found" });
        return;
      }

      // Confirm successful deletion
      res.json({ message: "Schedule deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
