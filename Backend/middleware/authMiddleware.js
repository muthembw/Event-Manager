const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
    let token;

    // Check if authorization header is present
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Extract token from the authorization header
            token = req.headers.authorization.split(" ")[1];

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user to the request object
            req.user = await User.findById(decoded.id).select("-password"); // Exclude password

            // Proceed to the next middleware or route handler
            return next();
        } catch (error) {
            // Handle token verification failure
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    // Handle case where token is not provided
    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token provided" });
    }
};

module.exports = protect;
