const apiAdapter = require("../../routes/api-adapter");
const { URL_SERVICE_USER } = process.env;
const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res, next) => {
    try {
        const user = await api.get(`/users/${req.user.id}`);

        if (user.data.data.role != "admin") {
            return res.status(403).json({
                status: "error",
                message: "Forbidden, access denied.",
            });
        }

        next();
    } catch (err) {
        return res.status(403).json({
            status: "error",
            message: "Forbidden, access denied.",
        });
    }
};
