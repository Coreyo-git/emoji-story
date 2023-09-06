const { Configuration, OpenAIApi } = require("openai");

// Create a new instance of Configuration with your OpenAI API key
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // API key obtained from environment variables
});

// Create an instance of the OpenAIApi using the Configuration
const openai = new OpenAIApi(configuration);

// async function for generating an analysis based on the story made
const generateStoryAnalysis = async (content) => {
    try {
		// Create a chat completion request to the GPT-3.5 Turbo model
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
					// set context for AI response
                    content:
                        'Given the following JSON structure, your job is to do literary analysis on a short story and expand on elements that are not present in the story, keep the details short, do not go in depth. \n\n{\n    "Introduction": {\n        "Title": "",\n        "PlotOverview": ""\n    },\n    "Summary": {\n        "MainEvents": "",\n        "TurningPoints": ""\n    },\n    "Characters": {\n        "MainCharacters": []\n    },\n    "Themes": {\n        "CentralThemes": []\n    },\n    "Setting": {\n        "Time": "",\n        "Place": ""\n    },\n    "Symbolism": {\n        "Symbols": []\n    },\n    "Conflict": {\n        "MainConflicts": []\n    },\n    "Style": {\n        "WritingStyle": "",\n        "ImpactOnReader": ""\n    },\n    "Mood": {\n        "MoodDescription": ""\n    },\n    "Impact": {\n        "EmotionalResponse": "",\n        "MessageInterpretation": ""\n    },\n    "KeyWord": {\n        "MostCommonWord": ""\n    },\n    "Conclusion": {\n        "Summary": "",\n        "PersonalInterpretation": ""\n    }\n}\n\n',
                },
                {
                    role: "user",
                    content: content, // User-provided story as a prompt
                },
            ],
            temperature: 0.3, // Control the randomness of the output
            max_tokens: 1000, // Limit the length of the generated text
            top_p: 0.6, // Control the diversity of the output
            frequency_penalty: 0, // Penalty for high-frequency words
            presence_penalty: 0, // Penalty for model-generated content
        });

		// Extract and return the generated analysis from the response
        return response.data.choices[0].message.content;
    } catch (error) {
		// Handle errors that may occur during the API call
        console.error("Error generating analysis:", error);
		
        throw new Error("An error occurred while generating the analysis.");
    }
};

module.exports = { generateStoryAnalysis };
