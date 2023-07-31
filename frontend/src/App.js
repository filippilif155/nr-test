import React from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Person from './pages/Person';

const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Person />} />
              <Route path="*" element={<Navigate to="/" />} />
          </Routes>
      </Router>
  );
};

export default App;