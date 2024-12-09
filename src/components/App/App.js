// import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Welcome } from '../Login/WelcomePage';
import { Login } from '../Login/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        
      </Routes>
    </Router>
  );
}

export default App;
