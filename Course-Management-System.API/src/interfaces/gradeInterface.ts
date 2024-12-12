import { Document } from "mongoose";

export interface IGrade extends Document {
  Grade_ID : Number,
  Student_ID : Number,
  Subj_desc : string,
  Units : Number,
  Credits : Number,
  Remarks : string
}
