require("dotenv").config();
const axios = require("axios");

// Async function for fetching emojis
const getRandomEmojis = async (group) => {
    try {
        // Construct the URL to fetch emojis based on the specified 'group'
        const url = `https://emojihub.yurace.pro/api/all/category/${group}`;

        // Time it hangs for response before going to fallback, 2 secs currently
        const timeoutMillis = 2000;

        try {
            // Make an HTTP GET request to the external API with a timeout
            const response = await axios.get(url, {
                timeout: timeoutMillis,
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // Return the data from the API response
            return response.data;
        } catch (error) {
            // If the external API request fails, fall back to a local hosted instance
            return fallbackRequest(group);
        }
    } catch (error) {
        // Handle any general errors that occur during function execution
        console.error("Request failed:", error.message);
    }
};

// Fallback function for fetching emojis locally
const fallbackRequest = async (group) => {
    // Construct the URL to fetch emojis from a local hosted instance
    const url = `${process.env.EMOJIHUB_HOST}:${process.env.EMOJIHUB_PORT}/api/all/category/${group}`;

    try {
        // Make an HTTP GET request to the local hosted instance
        const response = await axios.get(url, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Return the data from the local hosted instance's response
        return response.data;
    } catch (error) {
        // Handle any errors that occur during the local hosted instance's request
        console.error("Request failed:", error.message);
    }
};

module.exports = { getRandomEmojis };
