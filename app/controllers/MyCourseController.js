const apiAdapter = require("../../routes/api-adapter");
const { URL_SERVICE_COURSE } = process.env;
const api = apiAdapter(URL_SERVICE_COURSE);

const myCourseController = {
    index: async (req, res) => {
        try {
            const currentUser = req.user;

            const myCourses = await api.get("/my-courses", {
                params: {
                    user_id: currentUser.id,
                    include: req.query.include,
                },
            });

            return res.json(myCourses.data);
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
    store: async (req, res) => {
        try {
            const currentUser = req.user;

            req.body.user_id = currentUser.id;

            const myCourse = await api.post("/my-courses", req.body);

            return res.json(myCourse.data);
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

module.exports = myCourseController;
