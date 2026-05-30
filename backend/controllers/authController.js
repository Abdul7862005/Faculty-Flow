const loginUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        console.log(`Login attempt received for: ${email}, Role: ${role}`);

        // 1. This is a temporary development bypass so you can log in instantly
        // Without needing database records right now!
        res.status(200).json({
            message: "Login successful (Development Bypass)",
            token: "mock_development_jwt_token_abcdef123456",
            name: email.split("@")[0] // Uses the part before @ as the username
        });

    } catch (error) {
        console.error("Login controller error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const registerUser = async (req, res) => {
    res.json({ message: "Register working" });
};

module.exports = {
    loginUser,
    registerUser
};