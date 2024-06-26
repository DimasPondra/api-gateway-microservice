require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const mediaRouter = require("./routes/media");
const coursesRouter = require("./routes/courses");
const chaptersRouter = require("./routes/chapters");
const lessonsRouter = require("./routes/lessons");
const courseImagesRouter = require("./routes/course-images");
const myCoursesRouter = require("./routes/my-courses");
const reviewsRouter = require("./routes/reviews");
const ordersRouter = require("./routes/orders");
const paymentsRouter = require("./routes/payments");

const cors = require("cors");

/** Swagger */
const fs = require("fs");
const YAML = require("yaml");

const file = fs.readFileSync('./swagger.yaml', 'utf8');

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = YAML.parse(file);

const app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/media", mediaRouter);
app.use("/courses", coursesRouter);
app.use("/chapters", chaptersRouter);
app.use("/lessons", lessonsRouter);
app.use("/course-images", courseImagesRouter);
app.use("/my-courses", myCoursesRouter);
app.use("/reviews", reviewsRouter);
app.use("/orders", ordersRouter);
app.use("/payments", paymentsRouter);

module.exports = app;
