const apiAdapter = require("../../routes/api-adapter");
const { URL_SERVICE_MEDIA } = process.env;
const api = apiAdapter(URL_SERVICE_MEDIA);
const FormData = require("form-data");
const fs = require("fs");

const MediaController = {
    index: async (req, res) => {
        try {
            const media = await api.get("/media");

            return res.json(media.data);
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
        const files = req.files;

        try {
            const directory = req.body.directory;

            const form = new FormData();
            form.append("directory", directory);

            files.forEach((file) => {
                form.append("files", fs.createReadStream(file.path), {
                    filename: file.originalname,
                    contentType: file.mimetype,
                });
            });

            const media = await api.post("/media", form, {
                headers: {
                    ...form.getHeaders(),
                },
            });

            files.forEach((file) => fs.unlinkSync(file.path));

            return res.json(media.data);
        } catch (err) {
            files.forEach((file) => fs.unlinkSync(file.path));

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
            const media = await api.delete(`/media/${req.params.id}`);

            return res.json(media.data);
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

module.exports = MediaController;
