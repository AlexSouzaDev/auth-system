exports.register = (req, res) => {
    const { user, email, password } = req.body;  // Destructure user, email, and password from request body
    if (!user || !email || !password) {  // Check if user, email, and password are provided
        return res.status(400).json({ message: 'Please provide all required fields' });  // Return error response if any field is missing
    }
}