import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getStory } from "../services/getStory";
import { Discuss } from "react-loader-spinner";
import "../styles/story.css";

const Story = ({ selections, setSelections }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [story, setStory] = useState({});

    // Render navigation buttons based on the story state
    function NavButtons(story) {
        console.log(story.title);
        if (story.title !== "Error") {
            return (
                <div className="btn-container">
                    <button
                        className="restart-button"
                        onClick={() => {
                            setSelections("");
                            navigate("/");
                        }}
                    >
                        Generate a new story!
                    </button>

                    <button
                        className="analysis-button"
                        onClick={() => {
                            setSelections("");
                            navigate(
                                `/analysis?title=${story.title}&story=${story.story}`
                            );
                        }}
                    >
                        Generate an analysis of this story!
                    </button>
                </div>
            );
        } else
            return (
                <div
                    className="btn-container"
                    style={{ justifyContent: "center" }}
                >
                    <button
                        className="restart-button"
                        onClick={() => {
                            setSelections("");
                            navigate("/");
                        }}
                    >
                        Generate a new story!
                    </button>
                </div>
            );
    }

    // Fetch story and set it to state
    useEffect(() => {
        getStory(selections.selections).then((story) => {
            if (story) setStory(story);
            // if there was an error set the state to error
            else
                setStory({
                    title: "Error",
                    paragraphs: ["There was an error fetching the story :("],
                });

            setIsLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="main-story">
            {isLoading && story !== undefined ? (
                <div>
                    <h1>Generating your story...</h1>
                    <p>This short story is generated using AI it should only take a few of seconds.</p>
                    <p>
                        The AI uses the keyword as a theme and generates rich context
                        and emotion based off of the emoji's you chose.
                    </p>
                </div>
            ) : (
                <div>
                    <h1>{story.title}</h1>

                    <div className="story-body">
                        {story.paragraphs.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            )}
            <h2>Prompt: {selections.selections}</h2>
            {isLoading ? (
                <div className="spinner-container">
                    <Discuss color="#00BFFF" height={100} width={100} />
                </div>
            ) : (
                <NavButtons title={story.title} />
            )}
        </div>
    );
};

export default Story;
