const apiAdapter = require("../../routes/api-adapter");
const { URL_SERVICE_USER, JWT_SECRET_KEY } = process.env;
const api = apiAdapter(URL_SERVICE_USER);
const jwt = require("jsonwebtoken");
const formatHelper = require("../helpers/FormatHelper");

const authController = {
    register: async (req, res) => {
        try {
            const body = req.body;
            const user = await api.post("/users/register", body);

            return res.json(user.data);
        } catch (err) {
            if (err.code == "ECONNREFUSED") {
                return res.status(500).json({
                    status: "error",
                    message: "Service unavailable.",
                });
            }

            const { status, data } = err.response;
            return res.status(status).json(data);
        }
    },
    login: async (req, res) => {
        try {
            const body = req.body;
            const loggedIn = await api.post("/users/login", body);
            const user = await api.get(`users/${loggedIn.data.data.id}`);

            const payload = {
                id: user.data.data.id,
                role: user.data.data.role,
            };

            const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "7d" });

            return res.json({
                status: "success",
                message: "User successfully logged In.",
                data: {
                    id: payload.id,
                    token: token,
                },
            });
        } catch (err) {
            if (err.code == "ECONNREFUSED") {
                return res.status(500).json({
                    status: "error",
                    message: "Service unavailable.",
                });
            }

            const { status, data } = err.response;
            return res.status(status).json(data);
        }
    },
    logout: async (req, res) => {
        try {
            const user = req.user;
            const authorization = req.headers.authorization;
            const token = authorization.split(" ")[authorization.split(" ").length - 1];
            const formatDatetime = await formatHelper.epochTimeToDatetime(user.exp);

            const body = {
                token: token,
                role: user.role,
                expired_at: formatDatetime,
                user_id: user.id,
            };

            const blacklistToken = await api.post("/blacklist-tokens", body);

            return res.json(blacklistToken.data);
        } catch (err) {
            if (err.code == "ECONNREFUSED") {
                return res.status(500).json({
                    status: "error",
                    message: "Service unavailable.",
                });
            }

            const { status, data } = err.response;
            return res.status(status).json(data);
        }
    },
};

module.exports = authController;
