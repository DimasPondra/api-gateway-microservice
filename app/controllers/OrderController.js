const apiAdapter = require("../../routes/api-adapter");
const { URL_SERVICE_COURSE, URL_SERVICE_ORDER } = process.env;
const apiCourse = apiAdapter(URL_SERVICE_COURSE);
const apiOrder = apiAdapter(URL_SERVICE_ORDER);

const orderController = {
    joinCourse: async (req, res) => {
        try {
            const currentUser = req.user;
            req.body.user_id = currentUser.id;

            // Check if the user has joined this course.
            const myCourse = await apiCourse.get("/my-courses/check-course", {
                params: {
                    course_id: req.body.course_id,
                    user_id: currentUser.id,
                },
            });

            if (myCourse.data.data.result === "joined") {
                return res.status(400).json({
                    status: "error",
                    message: "You have joined this course.",
                });
            }

            // Check type for course
            const course = await apiCourse.get(`/courses/${req.body.course_id}`);
            const typeCourse = course.data.data.type;

            // Course Premium
            if (typeCourse === "premium") {
                const order = await apiOrder.post("/orders", req.body);

                return res.json(order.data);
            }

            // Course Free
            const addUserToCourse = await apiCourse.post("/my-courses/store", req.body);

            return res.json(addUserToCourse.data);
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

module.exports = orderController;
