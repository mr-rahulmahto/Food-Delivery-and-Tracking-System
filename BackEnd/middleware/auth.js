import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

const authMiddleware = async (req, res, next) => {
    const token = req.headers.token || (req.headers.authorization && req.headers.authorization.startsWith("Bearer ") ? req.headers.authorization.split(" ")[1] : req.headers.authorization);
    if (!token) {
        return res.json({ success: false, message: "Not Authorized Login Again" });
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body = req.body || {};
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log("Auth error:", error.message);
        res.json({ success: false, message: "Invalid or expired token, please login again" });
    }
}

export default authMiddleware;
