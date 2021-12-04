import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import LoginRegister from "./Components/LoginRegister";
import Feedback from "./Components/Feedback";

const App = () => {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="authenticate" element={<LoginRegister />} />
                    <Route path="/" element={<Feedback />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App;
