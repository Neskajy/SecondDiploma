import './App.scss';
import { useState, useEffect } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import LandingPage from './pages/LandingPage/LandingPage.jsx';
import ForgetPassword from './pages/ForgetPasswordPage/ForgetPasswordPage.jsx';
import AuthPage from './pages/AuthPage/AuthPage.jsx';
import AdminPage from './pages/AdminPage/AdminPage.jsx';

import AppealsPage from './pages/AdminPage/pagesInner/AppealsPage/AppealsPage.jsx';
import ArticlesPage from './pages/AdminPage/pagesInner/ArticlesPage/ArticlesPage.jsx';
import CalendarPage from './pages/AdminPage/pagesInner/CalendarPage/CalendarPage.jsx';
import GroupsPage from './pages/AdminPage/pagesInner/GroupsPage/GroupsPage.jsx';
import GroupPage from './pages/AdminPage/pagesInner/GroupsPage/pages/GroupPage/GroupPage.jsx';
import LessonsPage from './pages/AdminPage/pagesInner/LessonsPage/LessonsPage.jsx';
import ProfilePage from './pages/AdminPage/pagesInner/ProfilePage/ProfilePage.jsx';
import ControlUsersPage from './pages/AdminPage/pagesInner/ReallyAdminPage/ControlUsersPage.jsx';
import BidPage from "./pages/BidPage/BidPage.jsx"

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
              <Route path="/bid" element={<BidPage />}></Route>
              <Route path="/diploma">
                <Route path="/diploma/profile" element={<ProfilePage />}></Route>
                <Route path="/diploma/calendar" element={<CalendarPage />}></Route>
                <Route path="/diploma/groups" element={<GroupsPage />}></Route>
                <Route path="/diploma/groups/group" element={<GroupPage />}></Route>
                <Route path="/diploma/lessons" element={<LessonsPage />}></Route>
                <Route path="/diploma/articles" element={<ArticlesPage />}></Route>
                <Route path="/diploma/appeals" element={<AppealsPage />}></Route>
                <Route path="/diploma/reallyadmin">
                  <Route path="/diploma/reallyadmin/usersControl" element={<ControlUsersPage />}></Route>
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </BurgerContext.Provider>
      </uriHistoryContext.Provider>
    </>
  )
}

export default App
