import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import multer from 'multer';
import Application from './models/Application.js';
import Admin from './models/Admin.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGODB_URI;
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
const adminToken = 'gfg-admin-session-token';
const defaultAdmin = {
  username: '********',
  password: 'Password',
};

if (!mongoUri) {
  console.error('Missing MONGODB_URI environment variable.');
  process.exit(1);
}

app.use(cors({ origin: allowedOrigin }));
app.use(express.json({ limit: '1mb' }));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

const allowedResumeTypes = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

function requireAdmin(req, res, next) {
  const token = req.header('x-admin-token');

  if (token !== adminToken) {
    return res.status(401).json({ message: 'Unauthorized.' });
  }

  return next();
}

app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body || {};

  try {
    const admin = await Admin.findOne({ username: typeof username === 'string' ? username.trim() : '' }).lean();

    if (admin && admin.password === password) {
      return res.json({ token: adminToken, username: admin.username });
    }

    return res.status(401).json({ message: 'Invalid admin credentials.' });
  } catch (error) {
    console.error('Failed to authenticate admin:', error);
    return res.status(500).json({ message: 'Something went wrong while logging in.' });
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'recruitment-api' });
});

app.get('/api/applications', requireAdmin, async (_req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 }).select('-resume.data').lean();
    return res.json({ applications });
  } catch (error) {
    console.error('Failed to load applications:', error);
    return res.status(500).json({ message: 'Something went wrong while loading applications.' });
  }
});
// View resume
app.get('/api/applications/:id/resume', requireAdmin, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).select('resume').exec();

    if (!application || !application.resume || !application.resume.data) {
      return res.status(404).json({
        message: 'Resume not found.',
      });
    }

    const resumeBuffer = Buffer.isBuffer(application.resume.data)
      ? application.resume.data
      : Buffer.from(application.resume.data?.buffer || application.resume.data?.data || application.resume.data);

    res.setHeader(
      'Content-Type',
      application.resume.mimeType || 'application/pdf'
    );

    res.setHeader(
      'Content-Disposition',
      `inline; filename="${application.resume.fileName || 'resume'}"`
    );

    return res.send(resumeBuffer);
  } catch (error) {
    console.error('Failed to view resume:', error);

    return res.status(500).json({
      message: 'Something went wrong while loading the resume.',
    });
  }
});


// Download resume
app.get('/api/applications/:id/resume/download', requireAdmin, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).select('resume').exec();

    if (!application || !application.resume || !application.resume.data) {
      return res.status(404).json({
        message: 'Resume not found.',
      });
    }

    const resumeBuffer = Buffer.isBuffer(application.resume.data)
      ? application.resume.data
      : Buffer.from(application.resume.data?.buffer || application.resume.data?.data || application.resume.data);

    res.setHeader(
      'Content-Type',
      application.resume.mimeType || 'application/octet-stream'
    );

    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${application.resume.fileName || 'resume'}"`
    );

    return res.send(resumeBuffer);
  } catch (error) {
    console.error('Failed to download resume:', error);

    return res.status(500).json({
      message: 'Something went wrong while downloading the resume.',
    });
  }
});
app.post('/api/applications', upload.single('resume'), async (req, res) => {
  try {
    const {
      fullName,
      registrationNumber,
      year,
      department,
      phoneNumber,
      personalEmail,
      collegeEmail,
      linkedinProfileLink,
      role,
      preference1,
      preference2,
      preference3,
      fitParagraph,
      anythingToShare,
    } = req.body || {};

    const trimmedPersonalEmail = typeof personalEmail === 'string' ? personalEmail.trim().toLowerCase() : '';
    const trimmedCollegeEmail = typeof collegeEmail === 'string' ? collegeEmail.trim().toLowerCase() : '';
    const trimmedPhoneNumber = typeof phoneNumber === 'string' ? phoneNumber.trim() : '';
    const trimmedPreferences = [preference1, preference2, preference3].map((value) => (typeof value === 'string' ? value.trim() : ''));

    if (!fullName || !registrationNumber || !year || !department || !trimmedPhoneNumber || !trimmedPersonalEmail || !trimmedCollegeEmail || !linkedinProfileLink || !role || !fitParagraph) {
      return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    if (!/^\S+@\S+\.\S+$/.test(trimmedPersonalEmail)) {
      return res.status(400).json({ message: 'Please enter a valid email address.' });
    }

    if (!/^\S+@\S+\.\S+$/.test(trimmedCollegeEmail)) {
      return res.status(400).json({ message: 'Please enter a valid college email address.' });
    }

    if (!/^[0-9+\-()\s]{8,20}$/.test(trimmedPhoneNumber)) {
      return res.status(400).json({ message: 'Please enter a valid phone number.' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload your resume.' });
    }

    if (!allowedResumeTypes.has(req.file.mimetype)) {
      return res.status(400).json({ message: 'Resume must be a PDF, DOC, or DOCX file.' });
    }

    if (new Set(trimmedPreferences).size !== trimmedPreferences.length) {
      return res.status(400).json({ message: 'Please choose three different role preferences.' });
    }

    const application = await Application.create({
      fullName: fullName.trim(),
      registrationNumber: registrationNumber.trim(),
      year: year.trim(),
      department: department.trim(),
      phoneNumber: trimmedPhoneNumber,
      personalEmail: trimmedPersonalEmail,
      collegeEmail: trimmedCollegeEmail,
      linkedinProfileLink: linkedinProfileLink.trim(),
      role: role.trim(),
      preference1: trimmedPreferences[0],
      preference2: trimmedPreferences[1],
      preference3: trimmedPreferences[2],
      fitParagraph: fitParagraph.trim(),
      anythingToShare: typeof anythingToShare === 'string' ? anythingToShare.trim() : '',
      resume: {
        fileName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        data: req.file.buffer,
      },
    });

    return res.status(201).json({
      message: 'Application submitted successfully.',
      applicationId: application._id,
    });
  } catch (error) {
    console.error('Failed to save application:', error);
    return res.status(500).json({ message: 'Something went wrong while saving your application.' });
  }
});

async function start() {
  try {
    await mongoose.connect(mongoUri);
    await Admin.findOneAndUpdate(
      { username: defaultAdmin.username },
      { $set: defaultAdmin },
      { upsert: true, new: true }
    );
    app.listen(port, () => {
      console.log(`Recruitment API running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();