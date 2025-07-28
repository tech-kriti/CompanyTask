
import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  logo: {
    type: String, 
  },
  description: {
    type: String,
   
  },
  location: {
    type: String,
    required: true,
  },
  foundedOn: {
    type: Date,
  },
  city: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export const company = mongoose.model('Company', companySchema);
