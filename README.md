# Emoji-story

Emoji-Story is a creative and innovative AI-based short story generator that utilizes a single keyword and three emojis to craft captivating and imaginative short stories. With just a few inputs, you can unleash the power of artificial intelligence to weave engaging narratives that are sure to entertain and inspire.

## Table of Contents

- [Emoji-story](#emoji-story)
	- [Table of Contents](#table-of-contents)
	- [Context](#context)
	- [Technologies Used](#technologies-used)
	- [Getting Started](#getting-started)
	- [Usage](#usage)
	- [License](#license)

## Context

I created Emoji-Story as a short, fun and educational project while exploring AWS (Amazon Web Services) Cloud. The project combines technology and creativity, showcasing an accessible interaction using AI and cloud computing.

## Technologies Used

Emoji-Story is a multi-faceted project that leverages several cutting-edge technologies to provide its unique functionality. Here are the key technologies and tools used in this project:

- **Node.js Express**: The backend of Emoji-Story is built using Node.js and Express, providing a robust and scalable server framework.

- **React.js**: The frontend is developed with React.js, ensuring a responsive and user-friendly interface.

- **Nginx**: Nginx is used as a reverse proxy server to efficiently handle incoming requests and distribute traffic to the appropriate components.

- **Redis**: Cache and manage data efficiently, enhancing performance and reducing response times.

- **Docker Compose**: Orchestrate and manage containerized components, making deployment and scaling straightforward.

- **Docker**: Encapsulate and isolate individual parts of the application, simplifying development, and deployment processes.

- **OpenAI API**: Tapping into natural language processing capabilities to generate compelling short stories based on user inputs.

- **[EmojiHub](https://github.com/cheatsnake/emojihub)**: An API that provides access to emojis from sorted categories and groups.
This project also has a self-hosted (Golang) equivalent.
Emoji-story and the redis deployment utilizes both the API and the self hosted version for random emoji generation.

## Getting Started

1. Clone the repository to your local machine:

2. Set up the OpenAI API integration by obtaining an API key from the OpenAI website. Update the configuration files with your API key.

3. Use Docker Compose to build and run the application components. Detailed instructions can be found in the project's `docker-compose.yml` file.

4. Access the Emoji-Story web application via your browser and start generating short stories with the power of AI and emojis!

5. (Optional) Configure your AWS Cloud environment if you haven't already. Ensure that you have the required AWS credentials set up (This is required for the visitor count, will have to setup a dynamoDB instance also).

## Usage

Once you've set up Emoji-Story, using it is simple and intuitive:

1. Launch the Emoji-Story web application.

2. Enter a keyword and select three emojis that inspire you.

3. Click the "Generate Story" button, and watch as Emoji-Story crafts a unique and imaginative short story based on your inputs.

4. Feel free to experiment with different keywords and emojis to discover an array of captivating stories.

## License

Emoji-Story is licensed under the [MIT License](LICENSE), which means it's open source and free to use, modify, and distribute.

Thank you for exploring Emoji-Story! I hope you enjoy using it as much as I enjoyed creating it. If you have any questions, feedback, or ideas, please don't hesitate to reach out. Happy storytelling! 📖✨🚀
