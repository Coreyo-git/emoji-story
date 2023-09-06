const { Configuration, OpenAIApi } = require("openai");

// Create a new instance of Configuration with your OpenAI API key
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // API key obtained from environment variables
});

// Create an instance of the OpenAIApi using the Configuration
const openai = new OpenAIApi(configuration);

// async function for generating a story
const generateStory = async (content) => {
    try {
		// Create a chat completion request to the GPT-3.5 Turbo model
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
					// set context for AI response
                    content: `Generates a short story and title from one keyword as a theme and three emojis for the context. 
							The response should be very short and returned as JSON data: {title:{story title}, paragraphs:[p1,p2,...]}.`,
                },
                {
                    role: "user",
                    content: content, // User-provided content as a prompt
                },
            ],
            temperature: 0.5, // Control the randomness of the output
            max_tokens: 800, // Limit the length of the generated text
            top_p: 1, // Control the diversity of the output
            frequency_penalty: 0, // Penalty for high-frequency words
            presence_penalty: 0, // Penalty for model-generated content
        });

		// Extract and return the generated content from the API response
        return response.data.choices[0].message.content;
    } catch (error) {
		// Handle errors that may occur during the API call
        console.error("Error generating story:", error);

        throw new Error("An error occurred while generating the story");
    }
};

module.exports = { generateStory };
