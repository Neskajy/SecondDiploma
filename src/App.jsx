import { useState, useEffect } from 'react'
import './App.scss';

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LandingPage from './pages/landingPage.jsx';
import { BurgerContext } from "./Contexts.jsx";

function App() {
  const [isActiveBurger, setIsActiveBurger] = useState(false);
  
  
  return (
    <>
      <BurgerContext.Provider value={{isActiveBurger, setIsActiveBurger}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />}/>
          </Routes>
        </BrowserRouter>
      </BurgerContext.Provider>
    </>
  )
}

export default App
