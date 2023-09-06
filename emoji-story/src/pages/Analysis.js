import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getStoryAnalysis } from "../services/getStoryAnalysis";
import { Discuss } from "react-loader-spinner";
import "../styles/analysis.css";

const Analysis = ({ selections, setSelections }) => {
    // Hooks for navigation, location, and component state
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const title = queryParams.get("title");
    const story = queryParams.get("story");
    const [isLoading, setIsLoading] = useState(true);
    const [analysis, setAnalysis] = useState({});

    // Effect hook to fetch story analysis when the component mounts
    useEffect(() => {
        getStoryAnalysis(title + ": " + story).then((analysis) => {
            if (analysis) setAnalysis(analysis);
            else setAnalysis(errorAnalysis); // Set error analysis if no data is received
            setIsLoading(false); // Set loading state to false
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="main-analysis">
            {/* Conditional rendering based on loading state */}
            {isLoading && analysis !== undefined ? (
                <>
                    <h1>Generating your Analysis...</h1>
                    <p>
                        The analysis breaks down core components of the story
                        and can expand on some of the key elements.
                    </p>
					<p>This provides context and direction as to how this story could
                        progress and evolve!</p>
                </>
            ) : (
                <div className="analysis-container">
                    {/* Sections displaying analysis results */}

                    {/* TITLE SECTION */}
                    <div className="section">
                        <h2>{analysis.Introduction.Title}</h2>
                        <p>{analysis.Introduction.PlotOverview}</p>
                    </div>
                    <div className="section">
                        <h2>Summary</h2>
                        <p>{analysis.Summary.MainEvents}</p>
                        <p>{analysis.Summary.TurningPoints}</p>
                    </div>
                    <div className="section">
                        <h2>Characters</h2>
                        <p>
                            Main Characters:{" "}
                            {analysis.Characters.MainCharacters.join(", ")}
                        </p>
                    </div>
                    <div className="section">
                        <h2>Themes</h2>
                        <p>
                            Central Themes:{" "}
                            {analysis.Themes.CentralThemes.join(", ")}
                        </p>
                    </div>
                    <div className="section">
                        <h2>Setting</h2>
                        <p>Time: {analysis.Setting.Time}</p>
                        <p>Place: {analysis.Setting.Place}</p>
                    </div>
                    <div className="section">
                        <h2>Conflict</h2>
                        <p>
                            Main Conflicts:{" "}
                            {analysis.Conflict.MainConflicts.join(", ")}
                        </p>
                    </div>
                    <div className="section">
                        <h2>Style</h2>
                        <p>Writing Style: {analysis.Style.WritingStyle}</p>
                        <p>Impact on Reader: {analysis.Style.ImpactOnReader}</p>
                    </div>
                    <div className="section">
                        <h2>Mood</h2>
                        <p>Mood Description: {analysis.Mood.MoodDescription}</p>
                    </div>
                    <div className="section">
                        <h2>Impact</h2>
                        <p>
                            Emotional Response:{" "}
                            {analysis.Impact.EmotionalResponse}
                        </p>
                        <p>
                            Message Interpretation:{" "}
                            {analysis.Impact.MessageInterpretation}
                        </p>
                    </div>
                    <div className="section">
                        <h2>Conclusion</h2>
                        <p>{analysis.Conclusion.Summary}</p>
                        <p>{analysis.Conclusion.PersonalInterpretation}</p>
                    </div>
                </div>
            )}
            {/* Conditional rendering of a spinner during loading */}
            {isLoading ? (
                <div className="spinner-container">
                    <Discuss color="#00BFFF" height={100} width={100} />
                </div>
            ) : (
                <button
                    className="restart-button"
                    onClick={() => {
                        setSelections("");
                        navigate("/");
                    }}
                >
                    Generate a new story!
                </button>
            )}
        </div>
    );
};

export default Analysis;

// Default error analysis data
const errorAnalysis = {
    Introduction: {
        Title: "Error retrieving analysis :(",
        PlotOverview: "",
    },
    Summary: {
        MainEvents: "",
        TurningPoints: "",
    },
    Characters: {
        MainCharacters: [""],
    },
    Themes: {
        CentralThemes: [""],
    },
    Setting: {
        Time: "",
        Place: "",
    },
    Symbolism: {
        Symbols: [""],
    },
    Conflict: {
        MainConflicts: [""],
    },
    Style: {
        WritingStyle: "",
        ImpactOnReader: "",
    },
    Mood: {
        MoodDescription: "",
    },
    Impact: {
        EmotionalResponse: "",
        MessageInterpretation: "",
    },
    KeyWord: {
        MostCommonWord: "",
    },
    Conclusion: {
        Summary: "",
        PersonalInterpretation: "",
    },
};
