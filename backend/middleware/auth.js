import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.json({ success: false, message: "Not Authorized. No Token Found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id; // ✅ userId pass karega next handler ko
    next();
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Not Authorized. Invalid Token" });
  }
};

export default authUser;
