const apiAdapter = require("../../routes/api-adapter");
const { URL_SERVICE_COURSE } = process.env;
const api = apiAdapter(URL_SERVICE_COURSE);

const chapterController = {
    index: async (req, res) => {
        try {
            const chapters = await api.get("/chapters", {
                params: req.query,
            });

            return res.json(chapters.data);
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

            const course = await api.get(`/courses/${req.body.course_id}`, {
                params: {
                    include: "mentor",
                },
            });

            const courseMentorID = course.data.data.mentor.id;

            if (currentUser.id !== courseMentorID) {
                return res.status(403).json({
                    status: "error",
                    message: "Forbidden, access denied.",
                });
            }

            const chapter = await api.post("/chapters", req.body);

            return res.json(chapter.data);
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
            const chapter = await api.get(`/chapters/${req.params.id}`, {
                params: req.query,
            });

            return res.json(chapter.data);
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

            const chapter = await api.get(`/chapters/${req.params.id}`, {
                params: {
                    include: "course,mentor",
                },
            });

            const chapterMentorID = chapter.data.data.course.mentor.id;

            if (currentUser.id !== chapterMentorID) {
                return res.status(403).json({
                    status: "error",
                    message: "Forbidden, access denied.",
                });
            }

            const chapterUpdate = await api.patch(`/chapters/${req.params.id}`, req.body);

            return res.json(chapterUpdate.data);
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

            const chapter = await api.get(`/chapters/${req.params.id}`, {
                params: {
                    include: "course,mentor",
                },
            });

            const chapterMentorID = chapter.data.data.course.mentor.id;

            if (currentUser.id !== chapterMentorID) {
                return res.status(403).json({
                    status: "error",
                    message: "Forbidden, access denied.",
                });
            }

            const chapterDelete = await api.delete(`/chapters/${req.params.id}`);

            return res.json(chapterDelete.data);
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

module.exports = chapterController;
