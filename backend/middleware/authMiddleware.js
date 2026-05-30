const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({
                message: "No token, authorization denied"
            });
        }

        //  FIX: Handle "Bearer <token>" formatting gracefully if passed from frontend
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trim();
        }

        // Verify the cleaned token string against your secret key
        const verified = jwt.verify(token, "secretkey");

        req.user = verified;
        next();

    } catch (error) {
        res.status(401).json({
            message: "Token verification failed, authorization denied"
        });
    }
};

module.exports = authMiddleware;