import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    data: { type: Buffer, required: true },
  },
  { _id: false }
);

const applicationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    registrationNumber: { type: String, required: true, trim: true },
    year: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true, trim: true },
    personalEmail: { type: String, required: true, trim: true, lowercase: true },
    collegeEmail: { type: String, required: true, trim: true, lowercase: true },
    linkedinProfileLink: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    preference1: { type: String, required: true, trim: true },
    preference2: { type: String, required: true, trim: true },
    preference3: { type: String, required: true, trim: true },
    fitParagraph: { type: String, required: true, trim: true },
    anythingToShare: { type: String, default: '' },
    resume: { type: resumeSchema, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Application', applicationSchema);