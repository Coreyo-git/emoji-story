import { API_ENDPOINT } from "../apiEndPoint";

// fetch a analysis on a given story
export const getStoryAnalysis = async (story) => {
    // Commented out for testing purposes:
    // return testAnalysis;
    try {
        // Send a GET request to the analysis API with the provided story
        const response = await fetch(
            `http://${API_ENDPOINT}/analysis`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ story }),
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

// Define a test story analysis for reference (currently commented out)
// const testAnalysis = {
//     Introduction: {
//         Title: "The Goalkeeper's Test",
//         PlotOverview:
//             "In a small town, there was a young aspiring goalkeeper named Alex. He had always dreamed of becoming the best goalkeeper in the world, but he knew that he had to overcome numerous challenges and obstacles to achieve his goal.",
//     },
//     Summary: {
//         MainEvents:
//             "Alex spends hours practicing his skills, facing challenges from other players in the town. He catches the attention of scouts and is invited to try out for a prestigious academy. Alex gives his all during the tryouts and is chosen to be a part of the academy.",
//         TurningPoints:
//             "The turning point in the story is when Alex is invited to try out for the prestigious academy and when his name is called during the final selection.",
//     },
//     Characters: {
//         MainCharacters: ["Alex"],
//     },
//     Themes: {
//         CentralThemes: ["Perseverance", "Dedication", "Belief in oneself"],
//     },
//     Setting: {
//         Time: "Present day",
//         Place: "A small town and a prestigious academy",
//     },
//     Symbolism: {
//         Symbols: [],
//     },
//     Conflict: {
//         MainConflicts: [
//             "Alex's goal of becoming the best goalkeeper in the world and the challenges and obstacles he faces along the way",
//         ],
//     },
//     Style: {
//         WritingStyle: "Descriptive and motivational",
//         ImpactOnReader:
//             "The writing style creates a sense of determination and inspires the reader to believe in their own dreams and abilities.",
//     },
//     Mood: {
//         MoodDescription: "Motivational and uplifting",
//     },
//     Impact: {
//         EmotionalResponse:
//             "The story evokes feelings of hope, determination, and excitement.",
//         MessageInterpretation:
//             "The story teaches us that with hard work, dedication, and belief in ourselves, we can overcome challenges and achieve our goals.",
//     },
//     KeyWord: {
//         MostCommonWord: "goalkeeper",
//     },
//     Conclusion: {
//         Summary:
//             "Alex overcomes challenges and obstacles to achieve his dream of becoming a professional goalkeeper.",
//         PersonalInterpretation:
//             "The story emphasizes the importance of perseverance and believing in oneself in order to achieve success.",
//     },
// };
