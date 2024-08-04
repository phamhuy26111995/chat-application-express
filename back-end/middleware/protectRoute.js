import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';


const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if(!decoded) {
      return res.status(401).json({ error: "Not authorized, token failed" });
    }

    const user = await User.findById(decoded.userId);

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute", error.message);
    res.status(401).json({ error: "Not authorized, token failed" });
  }
}

export default protectRoute;