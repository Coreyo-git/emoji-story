const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const redis = require("redis");

const emojisRouter = require("./routes/emojis");
const storyRouter = require("./routes/story");
const analysisRouter = require("./routes/analysis");
const visitorsRouter = require("./routes/visitors");

const app = express();

// Initialize the Redis client variable
let redisClient;

// Asynchronous self-invoking function to set up the Redis client
(async () => {
    try {
        // Create a Redis client with the specified configuration
        redisClient = redis.createClient({
            socket: {
                host: process.env.REDIS_HOST, // Redis host from environment variables
                port: process.env.REDIS_PORT, // Redis port from environment variables
                connectTimeout: parseInt(process.env.REDIS_CONNECTION_TIMEOUT), // Connection timeout from environment variables
                reconnectStrategy: (retries, cause) => {
                    // Define the maximum number of retries
                    maxRetries = 4;
                    if (retries <= maxRetries) {
                        // If retries are within the limit, continue reconnecting
                        console.log(
                            `Retry attempt ${
                                maxRetries - retries + 1
                            }/5 after a delay`
                        );
                        return 2000; // Delay reconnection time by 10 seconds
                    } else {
                        // If maximum retry attempts are reached, stop reconnecting
                        console.error(
                            "Maximum retry attempts reached. Unable to connect to Redis."
                        );
                        return false; // Stop reconnecting
                    }
                },
            },
        });

        // Set up an error event handler for the Redis client
        redisClient.on("error", (error) => console.error(`${error}`));

        // Connect to the Redis server
        await redisClient.connect();
    } catch (error) {
        // Handle errors that occur during Redis client setup
        console.error("An error occurred while connecting to Redis:", error);
        console.log("Continuing without redis...");
        redisClientConnection = false; // Set a flag to indicate Redis connection failure
    }
})();

// Attach the Redis client to the request object for use in Express middleware
app.use((req, res, next) => {
    req.redisClient = redisClient;
    next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/emojis", emojisRouter);
app.use("/story", storyRouter);
app.use("/analysis", analysisRouter);
app.use("/visitors", visitorsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
