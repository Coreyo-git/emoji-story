import "../styles/themes.css";
import { randColor } from "../services/randColor";
import { randInt } from "../services/randInt";
import { shuffleArray } from "../services/shuffleArray";
import { storyFonts } from "../data/storyFonts";
import { storyThemes } from "../data/storyThemes";
import invert from "invert-color";
import { useNavigate } from "react-router-dom";

const Themes = ({ selections, setSelections }) => {
    const navigate = useNavigate();

    // Shuffle the array of story themes to display them in random order
    shuffleArray(storyThemes);

    // Generate HTML content for each theme
    const htmlContent = storyThemes.map((theme, index) => {
        const fontSize = randInt(22, 30); // Random font size
        const fontColor = randColor(); // Random font color
        const bkground = invert(fontColor); // Background color inverted for contrast
        const padding = randInt(8, 14); // Random padding
        const margin = randInt(10, 16); // Random margin
        const font = storyFonts[randInt(0, storyFonts.length - 1)]; // Random font from available fonts

        // Handle click event when a theme is selected
        const handleClick = (theme) => {
            setSelections({
                selections_count: 0,
                selections: theme + " ",
            });
            navigate("/emojis");
        };

        // Return a themed button element
        return (
            <span
                onClick={() => handleClick(theme)}
                className="theme-button"
                id={theme}
                key={index}
                style={{
                    fontSize: `${fontSize}px`,
                    backgroundColor: bkground,
                    color: fontColor,
                    fontFamily: font,
                    padding: `${padding}px`,
                    margin: `${margin}px`,
                }}
            >
                {theme}
            </span>
        );
    });

    return (
        <div className="main">
            <h1>Choose a theme for your story</h1>
            <h2>Selections: {selections.selections}</h2>
            <div>{htmlContent}</div>
        </div>
    );
};

export default Themes;
