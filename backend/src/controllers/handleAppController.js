import { ContactSubmission } from '../models/contact.model.js';
import { Visitor } from '../models/Visitor.models.js';
import { sendDiscordNotification } from '../utils/sendDiscordNotification.js';

const handleGetVisitor = async (req, res) => {
  try {
    const count = await Visitor.countDocuments();

    res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    console.error('Error tracking visitor:', error);
    res.status(500).json({ error: 'Failed to track visitor' });
  }
};

const handlePostMessage = async (req, res) => {
  try {
    const { name, email, subject, message, clientTimestamp } = req.body;

    const messageData = {
      name,
      email,
      subject,
      message,
      metadata: {
        ip:
          req.headers['x-forwarded-for']?.split(',')[0] ||
          req.headers['x-real-ip'] ||
          req.connection.remoteAddress ||
          'unknown',
        userAgent: req.headers['user-agent'] || 'unknown',
        // BEST PRACTICE: Use the timestamp from the client if available,
        // otherwise fall back to the server's time.
        clientTimestamp: clientTimestamp
          ? new Date(clientTimestamp)
          : new Date(),
      },
    };

    console.log('messageData', messageData);

    await ContactSubmission.create(messageData);
    // Send Discord notification
    await sendDiscordNotification('contact', messageData);

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

const handlePostVisitor = async (req, res) => {
  try {
    const {
      timestamp = '2024-05-21T10:30:00.000Z',
      userAgent,
      referrer,
    } = req.body;

    // Get client IP
    const ip =
      req.headers['x-forwarded-for']?.split(',')[0] ||
      req.headers['x-real-ip'] ||
      req.connection.remoteAddress ||
      'unknown';

    const visitorData = {
      timestamp: new Date(timestamp),
      ip,
      userAgent: userAgent
        ? userAgent
        : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
      referrer,
      createdAt: new Date(),
    };

    // save to mongodb
    await Visitor.create(visitorData);
    await sendDiscordNotification('visitor', visitorData);
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

export { handleGetVisitor, handlePostMessage, handlePostVisitor };
