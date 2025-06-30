import mongoose from 'mongoose';
import validator from 'validator'; // A popular library for robust validation

// 1. DEFINE THE SCHEMA
const contactSubmissionSchema = new mongoose.Schema(
  {
    // --- Core User-Provided Information ---
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true, // Remove leading/trailing whitespace
      minlength: [2, 'Name must be at least 2 characters long.'],
      maxlength: [100, 'Name cannot be more than 100 characters long.'],
    },
    email: {
      type: String,
      required: [true, 'Email address is required.'],
      trim: true,
      lowercase: true, // Store emails in a consistent, lowercase format
      validate: [validator.isEmail, 'Please provide a valid email address.'],
    },
    subject: {
      type: String,
      required: [true, 'Subject is required.'],
      trim: true,
      minlength: [5, 'Subject must be at least 5 characters long.'],
      maxlength: [200, 'Subject cannot be more than 200 characters long.'],
    },
    message: {
      type: String,
      required: [true, 'Message is required.'],
      trim: true,
      minlength: [10, 'Message must be at least 10 characters long.'],
      maxlength: [5000, 'Message cannot be more than 5000 characters long.'],
    },

    // --- Workflow & Management Fields ---
    status: {
      type: String,
      enum: {
        values: ['new', 'read', 'archived', 'spam'],
        message: 'Status must be one of: new, read, archived, or spam.',
      },
      default: 'new', // New submissions are automatically marked as 'new'
    },

    // --- System-Generated Metadata ---
    metadata: {
      ip: {
        type: String,
        required: [true, 'IP address is required for system tracking.'],
        validate: [validator.isIP, 'Invalid IP address format.'],
      },
      userAgent: {
        type: String,
        required: [true, 'User agent is required.'],
        maxlength: [500, 'User agent string is too long.'],
      },
      clientTimestamp: {
        type: Date,
        required: [true, 'Client-side timestamp is required.'],
      },
    },
  },
  {
    // 2. SCHEMA OPTIONS
    // Automatically adds `createdAt` and `updatedAt` fields. Essential for tracking.
    timestamps: true,
    // Explicitly set the collection name for clarity
    collection: 'contact_submissions',
  },
);

// 3. DATABASE INDEXES for Performance
// Indexing significantly speeds up queries on these fields.
// Index `email` for quick lookups of a user's submission history.
contactSubmissionSchema.index({ email: 1 });
// Compound index for filtering by status and then sorting by creation date.
// This is a very common query pattern (e.g., "Show me all 'new' messages, oldest first").
contactSubmissionSchema.index({ status: 1, createdAt: -1 });

// 4. CREATE AND EXPORT THE MODEL
const ContactSubmission = mongoose.model(
  'ContactSubmission',
  contactSubmissionSchema,
);

export { ContactSubmission };
