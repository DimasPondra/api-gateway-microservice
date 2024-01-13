const apiAdapter = require("../../routes/api-adapter");
const { URL_SERVICE_COURSE } = process.env;
const api = apiAdapter(URL_SERVICE_COURSE);

const reviewController = {
    store: async (req, res) => {
        try {
            const currentUser = req.user;

            req.body.user_id = currentUser.id;

            const review = await api.post("/reviews", req.body);

            return res.json(review.data);
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
            const review = await api.get(`/reviews/${req.params.id}`);

            return res.json(review.data);
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
            const currentUser = req.user;

            const review = await api.get(`/reviews/${req.params.id}`);

            const userID = review.data.data.user.id;

            if (userID !== currentUser.id) {
                return res.status(403).json({
                    status: "error",
                    message: "Forbidden, access denied.",
                });
            }

            const reviewUpdate = await api.patch(`/reviews/${req.params.id}`, req.body);

            return res.json(reviewUpdate.data);
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
    delete: async (req, res) => {
        try {
            const currentUser = req.user;

            const review = await api.get(`/reviews/${req.params.id}`);

            const userID = review.data.data.user.id;

            if (userID !== currentUser.id) {
                return res.status(403).json({
                    status: "error",
                    message: "Forbidden, access denied.",
                });
            }

            const reviewDelete = await api.delete(`/reviews/${req.params.id}`);

            return res.json(reviewDelete.data);
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

module.exports = reviewController;
