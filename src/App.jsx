import { useState, useEffect } from 'react'
import './App.scss';

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import { BurgerContext } from "./Contexts.jsx";
import AuthPage from './pages/AuthPage.jsx';
import RegPage from "./pages/RegPage.jsx";
import ForgetPassword from './components/ForgetPassword/ForgetPassword.jsx';

function App() {
  const [isActiveBurger, setIsActiveBurger] = useState(false);
  return (
    <>
      <BurgerContext.Provider value={{isActiveBurger, setIsActiveBurger}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />}/>
            <Route path="/auth" element={<AuthPage />}></Route>
            <Route path="/reg" element={<RegPage />}></Route>
            <Route path="/forgetPassword" element={<ForgetPassword />}></Route>
          </Routes>
        </BrowserRouter>
      </BurgerContext.Provider>
    </>
  )
}

export default App
