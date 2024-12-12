import mongoose, { Document, Schema } from 'mongoose';
import { IGrade } from '../interfaces/gradeInterface';

interface Grade extends Document {
  Grade_ID: Number;
  Student_ID: Number;
  Subj_desc: String;
  Units: Number;
  Credits: Number;
  Remarks: String;
}

const gradeSchema = new Schema({
  Grade_ID: { type: Number, required: true },
  Student_ID: { type: Number, required: true },
  Subj_desc: { type: String, required: true },
  Units: { type: Number, required: true },
  Credits: { type: Number, required: true },
  Remarks: { type: String, required: true },
});

export const Grade = mongoose.model<IGrade>('Grade', gradeSchema);
