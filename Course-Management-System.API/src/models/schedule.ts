import mongoose, { Document, Schema } from 'mongoose';
import { ISchedule } from '../interfaces/scheduleInterface';

interface Schedule extends Document {
  Schedule_ID: Number;
  Course_ID: Number;
  Teacher: String;
  Days: String;
  Class_time: String;
  Room: String;
  Lecture: Number;
  Laboratory: Number;
  Units: Number;
}

const scheduleSchema = new Schema({
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

export const Schedule = mongoose.model<ISchedule>('Schedule', scheduleSchema);