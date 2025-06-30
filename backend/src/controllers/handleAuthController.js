import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const JWT_SECRET = process.env.JWT_SECRET;

const handleLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username !== ADMIN_USERNAME) {
      res.status(401).json({ error: 'invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    console.log('🚀 ~ handleLogin ~ match:', isValidPassword);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'invalid credentials',
      });
    }

    // Generate JWT token
    const token = jwt.sign({ username, isAdmin: true }, JWT_SECRET, {
      expiresIn: '24h',
    });

    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

export { handleLogin };
