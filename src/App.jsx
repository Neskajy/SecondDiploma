import './App.scss';
import { useState, useEffect } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import LandingPage from './pages/LandingPage/LandingPage.jsx';
import ForgetPassword from './pages/ForgetPasswordPage/ForgetPasswordPage.jsx';
import AuthPage from './pages/AuthPage/AuthPage.jsx';
import AdminPage from './pages/AdminPage/AdminPage.jsx';

import AppealsPage from './pages/AdminPage/pagesInner/AppealsPage.jsx';
import ArticlesPage from './pages/AdminPage/pagesInner/ArticlesPage.jsx';
import CalendarPage from './pages/AdminPage/pagesInner/CalendarPage.jsx';
import GroupsPage from './pages/AdminPage/pagesInner/GroupsPage.jsx';
import LessonsPage from './pages/AdminPage/pagesInner/LessonsPage.jsx';
import ProfilePage from './pages/AdminPage/pagesInner/ProfilePage.jsx';

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
              <Route path="/admin" element={<AdminPage />}></Route>

              <Route path="/admin/profile" element={<AdminPage />}></Route>
              <Route path="/admin/calendar" element={<AdminPage />}></Route>
              <Route path="/admin/groups" element={<AdminPage />}></Route>
              <Route path="/admin/lessons" element={<AdminPage />}></Route>
              <Route path="/admin/articles" element={<AdminPage />}></Route>
              <Route path="/admin/appeals" element={<AdminPage />}></Route>
            </Routes>
          </BrowserRouter>
        </BurgerContext.Provider>
      </uriHistoryContext.Provider>
    </>
  )
}

export default App
