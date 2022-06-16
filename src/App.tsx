import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import About from './pages/About';
import AppLayout from './pages/AppLayout';
import Game from './pages/Game';
import Home from './pages/Home';
import Menu from './pages/Menu';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="menu" element={<Menu />} />
        <Route path="game">
          <Route path=":worldId/:levelId" element={<Game />} />
        </Route>
        <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
