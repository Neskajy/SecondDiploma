import './App.scss';
import { useState, useEffect } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import LandingPage from './pages/LandingPage/LandingPage.jsx';
import ForgetPassword from './pages/ForgetPasswordPage/ForgetPasswordPage.jsx';
import AuthPage from './pages/AuthPage/AuthPage.jsx';
import { BurgerContext } from "./Contexts.jsx";
import { uriHistoryContext } from './Contexts.jsx';

function App() {
  const [isActiveBurger, setIsActiveBurger] = useState(false);
  const [uriHistory, setUriHistory] = useState([]);

  return (
    <>
      <uriHistoryContext.Provider value={{uriHistory, setUriHistory}}>
        <BurgerContext.Provider value={{isActiveBurger, setIsActiveBurger}}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />}/>
              <Route path="/auth" element={<AuthPage />}></Route>
              <Route path="/forgetPassword" element={<ForgetPassword />}></Route>
            </Routes>
          </BrowserRouter>
        </BurgerContext.Provider>
      </uriHistoryContext.Provider>
    </>
  )
}

export default App
