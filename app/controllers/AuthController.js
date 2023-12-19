const apiAdapter = require("../../routes/api-adapter");
const { URL_SERVICE_USER, JWT_SECRET_KEY } = process.env;
const api = apiAdapter(URL_SERVICE_USER);
const jwt = require("jsonwebtoken");

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
            const user = await api.post("/users/login", body);

            const payload = user.data.data;
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
};

module.exports = authController;
