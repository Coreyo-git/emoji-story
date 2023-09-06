var express = require("express");
var router = express.Router();
const emojiGroups = require("../data/emojiGroups");
const { getRandomEmojis } = require("../services/getRandomEmojis.js");
const redis = require("redis");

router.get("/", async function (req, res, next) {
	// Select a random emoji group
    let group = emojiGroups[getRandomGroup()];
    let cachedResults;
    
	try {
		// Attempt to get cached results from Redis
        if (req.redisClient !== false) {
            cachedResults = await req.redisClient.get(group);
            if (cachedResults) {
				
				cachedResults = JSON.parse(cachedResults);
				shuffleArray(cachedResults);
                res.send(cachedResults);
                return;
            }
        } 
    } catch (error) {
		// Handle errors related to Redis client
        if (error instanceof redis.ClientClosedError) {
            console.error(
                "Redis client is closed. You may need to reconnect or handle this case appropriately."
            );
            req.redisClient = false; // Mark Redis client as closed
        } else console.error("Error fetching from redis:", error);
    }	
	
	// If cached results do not exist or Redis client is closed, fetch new emojis
    getRandomEmojis(group)
        .then((emojiResponse) =>
		 	// Handle the case where an error occurred when getting emojis
            formatEmojiResponse(emojiResponse).then((emojis) => {
                if (emojis == "error")
                    res.status(500).json({ error: "Error getting emojis" });
                else {
                    try {
						// Attempt to cache new emojis in Redis
                        if (req.redisClient !== false) {
                            console.log(req.redisClient);
                            req.redisClient.set(group, JSON.stringify(emojis));
                        }
                    } catch (error) {
						// Handles the situation where the Redis client is closed.
                        if (error instanceof redis.ClientClosedError) {
                            console.error(
                                "Redis client is closed. You need to restart this application as reconnection is not handled."
                            );
                            
                        } else {
                            // Handle other errors that may occur when using the Redis client
                            console.error(
                                "An error occurred while using the Redis client:",
                                error
                            );
                        }
                    }

					// Send the fetched emojis to the client
                    res.send(emojis);
                }
            })
        )
        .catch((error) => {
			// Handle errors that occur during emoji fetching or formatting
            console.error("Error:", error.message);
            res.status(500).json({ error: "An error occurred" });
        });
});

module.exports = router;

// Function to format the emoji response
async function formatEmojiResponse(emojiResponse) {
    if (emojiResponse) {
        const f_emojis = emojiResponse.map((emoji) => ({
            name: emoji.name,
            data: emoji.htmlCode[0],
        }));
        shuffleArray(f_emojis);

        return f_emojis;
    } else {
        return "error";
    }
}

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to get a random group index
function getRandomGroup() {
    min = Math.ceil(0);
    max = Math.floor(emojiGroups.length - 1);
    return Math.floor(Math.random() * (max - min) + min);
}
