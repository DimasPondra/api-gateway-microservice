const apiAdapter = require("../../routes/api-adapter");
const { URL_SERVICE_COURSE } = process.env;
const api = apiAdapter(URL_SERVICE_COURSE);

const lessonController = {
    index: async (req, res) => {
        try {
            const lessons = await api.get("/lessons", {
                params: req.query,
            });

            return res.json(lessons.data);
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

            const chapter = await api.get(`/chapters/${req.body.chapter_id}`, {
                params: {
                    include: "course,mentor",
                },
            });

            const mentorID = chapter.data.data.course.mentor.id;

            if (currentUser.id !== mentorID) {
                return res.status(403).json({
                    status: "error",
                    message: "Forbidden, access denied.",
                });
            }

            const lesson = await api.post("/lessons", req.body);

            return res.json(lesson.data);
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
            const lesson = await api.get(`/lessons/${req.params.id}`, {
                params: req.query,
            });

            return res.json(lesson.data);
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

            const lesson = await api.get(`/lessons/${req.params.id}`, {
                params: {
                    include: "chapter,course,mentor",
                },
            });

            const mentorID = lesson.data.data.chapter.course.mentor.id;

            if (currentUser.id !== mentorID) {
                return res.status(403).json({
                    status: "error",
                    message: "Forbidden, access denied.",
                });
            }

            const lessonUpdate = await api.patch(`/lessons/${req.params.id}`, req.body);

            return res.json(lessonUpdate.data);
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

            const lesson = await api.get(`/lessons/${req.params.id}`, {
                params: {
                    include: "chapter,course,mentor",
                },
            });

            const mentorID = lesson.data.data.chapter.course.mentor.id;

            if (currentUser.id !== mentorID) {
                return res.status(403).json({
                    status: "error",
                    message: "Forbidden, access denied.",
                });
            }

            const lessonDelete = await api.delete(`/lessons/${req.params.id}`);

            return res.json(lessonDelete.data);
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

module.exports = lessonController;
