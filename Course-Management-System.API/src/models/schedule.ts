import mongoose, { Schema, Document } from "mongoose";

// Define the Schedule interface
export interface ISchedule extends Document {
  Schedule_ID: number;
  Course_ID: number;
  Teacher: string;
  Days: string;
  Class_time: string;
  Room: string;
  Lecture: number;
  Laboratory: number;
  Units: number;
}

// Define the Schedule schema
const ScheduleSchema: Schema = new Schema({
  Schedule_ID: { type: Number, required: true },
  Course_ID: { type: Number, required: true },
  Teacher: { type: String, required: true },
  Days: { type: String, required: true },
  Class_time: { type: String, required: true },
  Room: { type: String, required: true },
  Lecture: { type: Number, required: true },
  Laboratory: { type: Number, required: true },
  Units: { type: Number, required: true },
});

// Export the Schedule model
export const Schedule = mongoose.model<ISchedule>("Schedule", ScheduleSchema);
