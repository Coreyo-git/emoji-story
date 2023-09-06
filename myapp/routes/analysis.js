var express = require("express");
var router = express.Router();
const {
    generateStoryAnalysis,
} = require("../services/generateStoryAnalysis.js");

router.post("/", async function (req, res, next) {
    try {
		// Retrieve the 'story' data from the request body
        const story = req.body.story;

		// Check if the 'story' data is missing
        if (!story) {
            return res
                .status(400)
                .json({ error: "Missing 'story' parameter" });
        }

		// Generate a story analysis using the provided story data
        const analysis = await generateStoryAnalysis(story);

		// Send the generated analysis
        res.send(analysis);
    } catch (error) {
		// Handle errors that occur during request processing
        console.error("Error processing request:", error);

		// Send a 500 Internal Server Error response with an error message
        res.status(500).json({
            error: "An error occurred while processing the request",
        });
    }
});

module.exports = router;
