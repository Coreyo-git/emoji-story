var express = require("express");
var router = express.Router();
const { incrementAndGetVisitorCounter } = require("../services/incrementAndGetVisitorCounter.js");

router.get("/", async function (req, res, next) {
	try {
		const updatedCount = await incrementAndGetVisitorCounter();
		console.log("Updated Visitor Count: " + updatedCount);
		
		// Send the new user count as the response
		res.status(200).json({count: updatedCount});
	} catch (error) {
		// Handle errors that occur during request
		console.error("Error processing request:", error);

		// Send a 500 Internal Server Error response with an error message
		res.status(500).json({ error: "An error occurred while processing the request" });
	}
});

module.exports = router;
