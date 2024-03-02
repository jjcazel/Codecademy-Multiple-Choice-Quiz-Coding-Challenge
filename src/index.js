import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Quiz as QuizPage } from './Quiz.js/Quiz';
import LandingPage from './LandingPage/LandingPage';

import './styles.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route exact path="/" Component={LandingPage} />
          <Route exact path="/quiz" Component={QuizPage} />
        </Routes>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
