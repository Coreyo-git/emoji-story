import "../styles/main.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getVisitorCount } from "../services/getVisitorCount";

const Main = () => {
    const [visitCount, setVisitCount] = useState(0);
    const navigate = useNavigate();

    // Fetch the visitor count when the component mounts
    useEffect(() => {
        async function fetchVisitorCount() {
            try {
                const count = await getVisitorCount();
                setVisitCount(count);
            } catch (error) {
                console.error("Failed to fetch visitor count:", error);
				setVisitCount(-1);
            }
        }
        fetchVisitorCount();
    }, []); // empty deps ensures it runs once on mount

    function VisitorCounter() {
        if (visitCount > 0) {
            return <div>Visit Counter: {visitCount}</div>;
        } else if(visitCount == -1) {
			return <div>Error fetching the visitor count &#128542;</div>
		} else {
			return "";
		}
    }

    return (
        <div className="main">
            <h1>AI Emoji Story Generator</h1>
            <h2>Steps:</h2>
            <div>
                <ol>
                    <li>Select a theme for your story:</li>
                    <li>Select three emojis to add context to your story:</li>
                    <li>AI Generates your story!</li>
                    <li>Read your AI emoji generated story!</li>
                    <li>
                        Generate an AI analysis, that summarizes and expands on
                        elements of your story!
                    </li>
                </ol>
            </div>
            <div>
                <button
                    className="start-button"
                    onClick={() => {
                        navigate("/themes");
                    }}
                >
                    Start crafting a story!
                </button>
            </div>
            <VisitorCounter />
        </div>
    );
};

export default Main;
