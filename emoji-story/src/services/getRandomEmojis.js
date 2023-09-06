import { API_ENDPOINT } from "../apiEndPoint";

// fetch random emojis from the API
export const getRandomEmojis = async () => {
    try {
        // Send a GET request to the API endpoint for random emojis
        const response = await fetch(`http://${API_ENDPOINT}/emojis`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        // Check if the response status is not OK
        if (!response.ok) {
            throw new Error(
                `Error: ${response.status} - ${await response.text()}`
            );
        }
        // Parse the response data as JSON
        const data = await response.json();

        // Return the retrieved random emojis data
        return data;
    } catch (error) {
        // Handle and log any errors that occur during the request
        console.error("Request failed:", error.message);
    }
};
