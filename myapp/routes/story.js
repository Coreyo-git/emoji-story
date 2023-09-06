var express = require("express");
var router = express.Router();
const { generateStory } = require("../services/generateStory.js");

router.get("/", async function (req, res, next) {
	try {
		// Get the 'prompt' query parameter from the request
		const prompt = req.query.prompt;

		// Check if the 'prompt' parameter is missing
		if (!prompt) {
			return res.status(400).json({ error: "Missing 'prompt' parameter" });
		}

		// Generate a story using the provided prompt
		const story = await generateStory(prompt);
		
		// Send the generated story as the response
		res.send(story);
	} catch (error) {
		// Handle errors that occur during request processing
		console.error("Error processing request:", error);

		// Send a 500 Internal Server Error response with an error message
		res.status(500).json({ error: "An error occurred while processing the request" });
	}
});

module.exports = router;
