import mongoose from 'mongoose';

// 1. DEFINE THE SCHEMA
// A schema is the blueprint for the data in a collection. It defines the fields,
// their types, and any rules or constraints (like being required).
const visitorSchema = new mongoose.Schema(
  {
    // The timestamp sent from the client's browser.
    timestamp: {
      type: Date,
      required: [true, 'Client timestamp is required.'], // Field must be provided
    },

    // The visitor's IP address.
    ip: {
      type: String,
      required: [true, 'IP address is required.'],
      trim: true, // Automatically removes leading/trailing whitespace
    },

    // The browser's user agent string.
    userAgent: {
      type: String,
      required: [true, 'User agent is required.'],
    },

    // The referring URL. If the user came directly, this can be empty.
    referrer: {
      type: String,
      default: 'Direct', // If no referrer is provided, it defaults to 'Direct'
    },
  },
  {
    // 2. SCHEMA OPTIONS
    // This is a Mongoose best practice. It automatically adds two fields to your documents:
    // - `createdAt`: The date and time the document was created.
    // - `updatedAt`: The date and time the document was last updated.
    timestamps: true,
  },
);

// 3. CREATE AND EXPORT THE MODEL
// Mongoose takes the singular model name 'Visitor' and automatically creates a
// database collection named 'visitors' (plural and lowercase).
const Visitor = mongoose.model('Visitor', visitorSchema);

export { Visitor };
