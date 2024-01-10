const apiAdapter = require("../../routes/api-adapter");
const { URL_SERVICE_COURSE } = process.env;
const api = apiAdapter(URL_SERVICE_COURSE);

const courseController = {
    index: async (req, res) => {
        try {
            const courses = await api.get("/courses", {
                params: req.query,
            });

            return res.json(courses.data);
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
            if (req.user.role !== "mentor" && req.user.role !== "admin") {
                return res.status(401).json({
                    status: "error",
                    message: "Unauthorized, only mentor or admin can access.",
                });
            }

            const course = await api.post("/courses", req.body);

            return res.json(course.data);
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
            const course = await api.get(`/courses/${req.params.id}`, {
                params: req.query,
            });

            return res.json(course.data);
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

            const course = await api.get(`/courses/${req.params.id}`, {
                params: req.query,
            });

            const courseMentorID = course.data.data.mentor.id;

            if (currentUser.id !== courseMentorID) {
                return res.status(403).json({
                    status: "error",
                    message: "Forbidden, access denied.",
                });
            }

            req.body.mentor_user_id = currentUser.id;

            const courseUpdate = await api.patch(`/courses/${course.data.data.id}`, req.body);

            return res.json(courseUpdate.data);
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

module.exports = courseController;
