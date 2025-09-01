import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: 'Not Authorized as Admin' });
    }

    next();
  } catch (error) {
    return res.json({ success: false, message: "Invalid Admin Token" });
  }
};

export default adminAuth;
