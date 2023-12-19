const apiAdapter = require("../../routes/api-adapter");
const { URL_SERVICE_USER } = process.env;
const api = apiAdapter(URL_SERVICE_USER);

const userController = {
    index: async (req, res) => {
        try {
            const users = await api.get("/users", {
                params: req.query,
            });

            return res.json(users.data);
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
    show: async (req, res) => {
        try {
            const user = await api.get(`/users/${req.user.id}`);

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
    update: async (req, res) => {
        try {
            const user = await api.patch(`users/${req.user.id}`, req.body);

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
};

module.exports = userController;
