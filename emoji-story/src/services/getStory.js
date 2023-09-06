import { API_ENDPOINT } from "../apiEndPoint";

// fetch a story based on a given prompt
export const getStory = async (prompt) => {
    // Commented out for testing purposes:
    // return testStory;
    try {
        // Send a GET request to the story API with the provided prompt
        const response = await fetch(
            `http://${API_ENDPOINT}/story?prompt=${prompt}`,
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
        const data = await response.json();

        // Return the retrieved story data
        return data;
    } catch (error) {
        // Handle and log any errors that occur during the request
        console.error("Request failed:", error.message);
    }
};

// Define a test story for reference (currently commented out)
// const testStory = {
//     title: "The Goalkeeper's Test",
//     story: "In a small town, there was a young aspiring goalkeeper named Alex. He had always dreamed of becoming the best goalkeeper in the world, but he knew that he had to overcome numerous challenges and obstacles to achieve his goal. Every day, Alex would wake up early and head to the local football field. He would spend hours practicing his skills, diving to make incredible saves and perfecting his technique. The other players in the town would often challenge him, trying to score goals past him. But Alex was determined to prove himself. He faced each challenge with determination and perseverance. As time went on, Alex's skills improved, and he started catching the attention of scouts from professional football clubs. He was invited to try out for a prestigious academy known for producing top goalkeepers. The tryouts were intense, with talented young players from all over the country competing for a spot. But Alex didn't let the pressure get to him. He focused on his training and gave his all during the tryouts. Finally, the day of the final selection arrived. Alex's heart raced as the coach announced the names of the chosen players. And there it was - his name was called! Alex had made it! He had overcome the challenges and obstacles that stood in his way. From that moment on, his journey as a professional goalkeeper began, filled with even more challenges and obstacles. But Alex was ready. He knew that with hard work, dedication, and belief in himself, he could conquer anything that came his way. And one day, he would become the best goalkeeper in the world.",
// };
