import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import UserDashboard from './pages/Dashboad';
// import { useEffect, useState } from 'react';

import './App.css';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/landingpage" element={<LandingPage />} />
                    <Route path="/" element={<UserDashboard />} />
                    <Route path="/dashboard/*" element={<UserDashboard />} />
                </Routes>
                {/* <QuestionPage /> */}
            </div>
        </Router>
    );
}

export default App;
