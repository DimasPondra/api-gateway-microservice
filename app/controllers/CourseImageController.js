const apiAdapter = require("../../routes/api-adapter");
const { URL_SERVICE_COURSE } = process.env;
const api = apiAdapter(URL_SERVICE_COURSE);

const courseImageController = {
    store: async (req, res) => {
        try {
            const currentUser = req.user;

            const course = await api.get(`/courses/${req.body.course_id}`, {
                params: {
                    include: "mentor",
                },
            });

            const mentorID = course.data.data.mentor.id;

            if (currentUser.id !== mentorID) {
                return res.status(403).json({
                    status: "error",
                    message: "Forbidden, access denied.",
                });
            }

            const courseImage = await api.post("/course-images", req.body);

            return res.json(courseImage.data);
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

            const courseImage = await api.get(`/course-images/${req.params.id}`, {
                params: {
                    include: "course,mentor",
                },
            });

            const mentorID = courseImage.data.data.course.mentor.id;

            if (currentUser.id !== mentorID) {
                return res.status(403).json({
                    status: "error",
                    message: "Forbidden, access denied.",
                });
            }

            const courseImageDelete = await api.delete(`/course-images/${req.params.id}`);

            return res.json(courseImageDelete.data);
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

module.exports = courseImageController;
