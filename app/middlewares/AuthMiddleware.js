const jwt = require("jsonwebtoken");
const { URL_SERVICE_USER, JWT_SECRET_KEY } = process.env;
const apiAdapter = require("../../routes/api-adapter");
const api = apiAdapter(URL_SERVICE_USER);

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

        const blacklistToken = await api.get(`/blacklist-tokens/${token}`);

        if (blacklistToken.data.message === "available") {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized, token is invalid.",
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET_KEY);

        if (!decoded.id || !decoded.role || !decoded.iat || !decoded.exp) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized, token is invalid.",
            });
        }

        const user = await api.get(`/users/${decoded.id}`);

        if (user.data.data.role !== decoded.role) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized, token is invalid.",
            });
        }

        req.user = decoded;

        next();
    } catch (err) {
        return res.status(401).json({
            status: "error",
            message: "Unauthorized, token is invalid.",
        });
    }
};
