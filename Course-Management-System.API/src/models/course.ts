import mongoose, { Document, Schema } from 'mongoose';
import { ICourse } from '../interfaces/courseInterface';

interface Course extends Document {
  Course_ID: Number;
  Course_name: String;
  Credits: Number;
  Catalog_no: String;
  Academic_yr: Number;
}

const courseSchema = new Schema({
  Course_ID: { type: Number, required: true },
  Course_name: { type: String, required: true },
  Credits: { type: Number, required: true },
  Catalog_no: { type: String, required: true },
  Academic_yr: { type: Number, required: true },
});

export const Course = mongoose.model<ICourse>('Course', courseSchema);
