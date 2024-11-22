import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import QuestionPage from './pages/QuestionPage';
import LandingPage from './pages/LandingPage';
// import { useEffect, useState } from 'react';

import './App.css';


function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/questions' element={<QuestionPage />} />
        </Routes>
        {/* <QuestionPage /> */}
            
      </div>
    </Router>
  );
}

export default App;
