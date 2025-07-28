
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  reviewText: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
 
}, { timestamps: true });

export const review = mongoose.model('Review', reviewSchema);
