import React from 'react';
import logo from './logo.svg';
import './App.css';
import Heading from './Components/Heading';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';

function App() {
  return (
    <div className="w-screen overflow-x-hidden min-h-screen bg-white flex flex-col font-inter ">
         <Heading/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
        </Routes>
    </div>
  );
}

export default App;
