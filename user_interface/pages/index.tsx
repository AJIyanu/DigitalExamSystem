import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from '../src/pages/LandingPage';
// import UserDashboard from '../src/pages/Dashboad';
// import { useEffect, useState } from 'react';

// import './App.css';

// function Home() {
//     return (
//         <Router>
//             <div>
//                 <Routes>
//                     <Route path="/" element={<LandingPage />} />
//                     {/* <Route path="/" element={<UserDashboard />} /> */}
//                     <Route path="/dashboard/*" element={<UserDashboard />} />
//                 </Routes>
//                 {/* <QuestionPage /> */}
//             </div>
//         </Router>
//     );
// }

function Home() {
    return <LandingPage />;
}

export default Home;
