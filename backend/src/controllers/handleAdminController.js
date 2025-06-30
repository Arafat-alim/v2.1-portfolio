import { ContactSubmission } from '../models/contact.model.js';
import { Visitor } from '../models/Visitor.models.js';

const handleAdminGetVisitors = async (req, res) => {
  try {
    const [count, recent] = await Promise.all([
      Visitor.countDocuments(), // Query 1: Count all documents
      Visitor.find({}) // Query 2: Find documents...
        .sort({ timestamp: -1 }) // ...sort by timestamp descending...
        .limit(20), // ...get the top 20.
    ]);

    res.status(200).json({
      success: true,
      count,
      recent,
    });
  } catch (err) {
    console.log('Failed to ', err);
    res.status(500).json({
      success: false,
      error: 'Failed to load the count',
    });
  }
};

const handleGetSubmitMessages = async (req, res) => {
  try {
    const messages = await ContactSubmission.find({})
      .sort({ timestamp: -1 })
      .limit(20); // ...get the top 20.
    res.status(200).json({
      succesS: true,
      messages,
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ sucess: false, error: 'Failed to fetch messages' });
  }
};

export { handleAdminGetVisitors, handleGetSubmitMessages };
