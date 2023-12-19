const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;

module.exports = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized, token is invalid.",
            });
        }
        const token = authorization.split(" ")[authorization.split(" ").length - 1];

        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        req.user = decoded;

        next();
    } catch (err) {
        return res.status(401).json({
            status: "error",
            message: "Unauthorized, token is invalid.",
        });
    }
};
