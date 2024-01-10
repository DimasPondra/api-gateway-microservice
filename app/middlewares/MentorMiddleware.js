module.exports = async (req, res, next) => {
    try {
        if (req.user.role !== "mentor") {
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
