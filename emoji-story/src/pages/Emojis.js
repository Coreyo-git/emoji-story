import { useState, useEffect } from "react";
import { getRandomEmojis } from "../services/getRandomEmojis";
import { randInt } from "../services/randInt";
import { decodeHTML } from "entities";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlass } from "react-loader-spinner";
import "../styles/emojis.css";

const Emojis = ({ selections, setSelections }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [emojis, setEmojis] = useState([]);

    // Function to handle emoji click
    function handleClick(emoji) {
        setSelections((prev) => {
            const newSelectionsCount = prev.selections_count + 1;

            if (newSelectionsCount >= 3) {
                navigate("/story");
            } else {
                getEmojis();
            }

            return {
                selections_count: newSelectionsCount,
                selections: prev.selections + " " + emoji,
            };
        });
    }
    // Function to fetch random emojis
    async function getEmojis() {
        setIsLoading(true);
        const fetchEmojis = await getRandomEmojis();
        if (fetchEmojis) {
            setEmojis(
                fetchEmojis.map((emoji, index) => {
                    const padding = randInt(6, 20);
                    const margin = randInt(8, 14);
                    const fontSize = randInt(30, 102);

                    // Decode HTML entities using the entities library
                    const decodedEmoji = decodeHTML(emoji.data);

                    return (
                        <span
                            key={index}
                            onClick={() => handleClick(decodedEmoji)}
                            style={{
                                padding: `${padding}px`,
                                margin: `${margin}px`,
                                fontSize: `${fontSize}px`,
                            }}
                        >
                            {decodedEmoji}
                        </span>
                    );
                })
            );
        } else {
            setEmojis("Error getting emojis ☹️, try a reshuffle");
        }

        setIsLoading(false);
    }
    useEffect(() => {
        // Redirect to the story page if selections count is 2 or more
        if (selections.selections_count >= 2) {
            navigate("/story");
        } else {
            getEmojis();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="main">
            <h1>Choose emojis to build your story!</h1>
            <div className="spinner-container">
                <h2>Selections: {selections.selections}</h2>
                <p>Selections: {selections.selections_count}/3</p>
                {isLoading ? (
                    ""
                ) : (
                    <div className="button-container">
                        <button
                            className="reshuffle-button"
                            onClick={() => {
                                getEmojis();
                            }}
                        >
                            Reshuffle Emojis
                        </button>
                    </div>
                )}
            </div>
			{/* Loading spinner conditional */}
            {isLoading ? (
                <div className="spinner-container">
                    <p>Randomizing Emojis...</p>
                    <MagnifyingGlass height="150" width="150" color="#00BFFF" />
                </div>
            ) : (
                <div>{emojis}</div>
            )}
        </div>
    );
};

export default Emojis;
