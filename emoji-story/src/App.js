import Main from "./pages/Main"; // Import the Main component
import Themes from "./pages/Themes"; // Import the Themes component
import Emojis from "./pages/Emojis"; // Import the Emojis component
import Story from "./pages/Story"; // Import the Story component
import Analysis from "./pages/Analysis"; // Import the Analysis component
import Error from "./pages/Error"; // Import the Error component
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';

function App() {
	// Define state to manage user selections
	const [selections, setSelections] = useState({
		selections_count: 0, // Initialize selections count to 0
		selections: "" // Initialize selections as an empty string
	});
	
    return (
        <div className="app">
            {/* Init routing using the React-Router-Dom components */}
            <Router>
                <Routes>
                    {/* Define routes for different pages */}
                    <Route path="/" element={<Main />} /> {/* Main page route */}
                    <Route path="/themes" element={<Themes selections={selections} setSelections={setSelections}/>} /> {/* Themes page route */}
                    <Route path="/emojis" element={<Emojis selections={selections} setSelections={setSelections}/>} /> {/* Emojis page route */}
					<Route path="/story" element={<Story selections={selections} setSelections={setSelections}/>} /> {/* Story page route */}
					<Route path="/analysis" element={<Analysis selections={selections} setSelections={setSelections}/>} /> {/* Analysis page route */}
                    <Route path="*" element={<Error />} /> {/* Catch-all error route */}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
