import './App.scss';
import { useState, lazy, Suspense } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';

const LandingPage = lazy(() => import('./pages/LandingPage/LandingPage.jsx'));
const ForgetPassword = lazy(() => import('./pages/ForgetPasswordPage/ForgetPasswordPage.jsx'));
const AuthPage = lazy(() => import('./pages/AuthPage/AuthPage.jsx'));
const BidPage = lazy(() => import("./pages/BidPage/BidPage.jsx"));
const LogoutPage = lazy(() => import('./pages/LogoutPage/LogoutPage.jsx'));

const ProfilePage = lazy(() => import('./pages/AdminPage/pagesInner/ProfilePage/ProfilePage.jsx'));
const ControlGroupsPage = lazy(() => import('./pages/AdminPage/pagesInner/ControlGroupsPage/ControlGroupsPage.jsx'));
const GroupPage = lazy(() => import('./pages/AdminPage/pagesInner/GroupsPage/pages/GroupPage/GroupPage.jsx'));
const ArticlesPage = lazy(() => import('./pages/AdminPage/pagesInner/ArticlesPage/ArticlesPage.jsx'));
const CurriculumPage = lazy(() => import('./pages/AdminPage/pagesInner/Curriculum/CurriculumPage'));
const AppealsPage = lazy(() => import('./pages/AdminPage/pagesInner/AppealsPage/AppealsPage.jsx'));

const ControlUsersPage = lazy(() => import('./pages/AdminPage/pagesInner/ControlUsersPage/ControlUsersPage.jsx'));
const CalendarPage = lazy(() => import('./pages/AdminPage/pagesInner/CalendarPage/CalendarPage.jsx'));
const TimetablesPage = lazy(() => import('./pages/AdminPage/pagesInner/TimetablesPage/TimetablesPage.jsx'));
const ControlAppealsPage = lazy(() => import('./pages/AdminPage/pagesInner/ControlAppealsPage/ControlAppealsPage.jsx'));




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
              <Route path="/logout" element={<LogoutPage />}></Route>
              <Route path="/forgetPassword" element={<ForgetPassword />}></Route>
              <Route path="/appeal" element={<BidPage />}></Route>
              <Route path="/diploma">
                <Route path="/diploma/profile" element={<ProfilePage />}></Route>
                <Route path="/diploma/groups" element={<ControlGroupsPage />}></Route>
                <Route path="/diploma/groups/:id" element={<GroupPage />}></Route>
                <Route path="/diploma/articles" element={<ArticlesPage />}></Route>
                <Route path="/diploma/curriculum" element={<CurriculumPage />}></Route>
                <Route path="/diploma/appeals" element={<AppealsPage />}></Route>
                <Route path="/diploma/reallyadmin">
                  <Route path="/diploma/reallyadmin/usersControl" element={<ControlUsersPage />}></Route>
                  <Route path="/diploma/reallyadmin/calendar" element={<CalendarPage />}></Route>
                  <Route path="/diploma/reallyadmin/timetables" element={<TimetablesPage />}></Route>
                  <Route path="/diploma/reallyadmin/appealsControl" element={<ControlAppealsPage />}></Route>
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
