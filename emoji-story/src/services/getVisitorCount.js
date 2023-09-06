import { API_ENDPOINT } from "../apiEndPoint";

// fetch the visitor count
export const getVisitorCount = async () => {
    try {
        // Send a GET request to the visitors API
        const response = await fetch(
            `http://${API_ENDPOINT}/visitors`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        // Check if the response status is not OK
        if (!response.ok) {
            throw new Error(
                `Error: ${response.status} - ${await response.text()}`
            );
        }
        // Parse the response data as JSON
        const visitorCount = await response.json();

        // Return the retrieved visitor count
        return visitorCount.count;
    } catch (error) {
        // Handle and log any errors that occur during the request
        console.error("Request failed:", error.message);
    }
};

