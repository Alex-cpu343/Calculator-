import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import React, { useEffect, useState,createContext } from 'react';
import Calculator from './Calculator';
import Graf from './Graf';
import Mod from './Mod';
import './index.css'; 
  export const the = createContext()
function App() {

  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light';
    setTheme(saved);
    document.body.className = saved; 
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  return (
    <the.Provider value={theme}>
    <Router>
      <div className="min-h-screen max-w-6xl mx-auto px-4 ">
      <header className="p-4 flex justify-between items-center shadow-lg w-[80%] mx-auto h-15 rounded-xl heade">
          <nav className="flex space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? ' font-bold bt1 shadow-lg  flex items-center justify-center  w-20 h-10 rounded-lg' : ' flex items-center justify-center hover:underline  bt1 '
              }
            >
              Calculator
            </NavLink>
            <NavLink
              to="/3d"
              className={({ isActive }) =>
                isActive ? ' font-bold bt1 shadow-lg  flex items-center justify-center  w-20 h-10 rounded-lg bt2' : 'flex items-center justify-center hover:underline bt2'
              }
            >
              3D Figur
            </NavLink>
            <NavLink
              to="/graf"
              className={({ isActive }) =>
                isActive ? 'nderline font-bold bt1 shadow-lg  flex items-center justify-center  w-20 h-10 rounded-lg bt3' : 'flex items-center justify-center hover:underline bt3'
              }
            >
              Graf
            </NavLink>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === 'light' ? ' Dark' : ' Light'}
            </button>
          <span className={`w-10 h-10 rounded-3xl transition duration-300 ${theme === 'light' ? 'bg-black' : 'bg-white' }`} />          </div>
        </header>

        <main className="mt-6">
          <Routes>
            <Route path="/" element={<Calculator />} />
            <Route path="/3d" element={<Mod />} />
            <Route path="/graf" element={<Graf />} />
          </Routes>
        </main>
      </div>
    </Router>
    </the.Provider>
  );
}

export default App;
