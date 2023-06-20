import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import SearchPage from './pages/Search.page';
import HomePage from './pages/Home.page';
import ProfilePage from './pages/Profile.page';
import AddEntryPage from './pages/AddEntry.page';
import LoginPage from "./pages/Login.page";
import CreateUserPage from "./pages/CreateUser.page";
import useAuth from './hooks/useAuth';
import './App.css';

function App() {
  const { auth, setAuth } = useAuth();

  return (
      <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to='/profile'>Profile</Link>
                </li>
                <li className='right-edge-pusher'>
                  <Link to='/'>Home</Link>
                </li>
                <li>
                  <Link to='/add'>Add</Link>
                </li>
                <li>
                  <Link to='/search'>Search</Link>
                </li>
              </ul>
            </nav>
            <Routes>
              <Route element={<Outlet context={{auth, setAuth}}/>}>
                <Route path='/' element={<HomePage /> }/>
                <Route path='/profile' element={<ProfilePage />}/>
                <Route path='/add' element={<AddEntryPage />}/>
                <Route path='/search' element={<SearchPage />}/>
                <Route path="/login" element={<LoginPage /> }/>
                <Route path="/user" element={<CreateUserPage /> }/>
              </Route>
            </Routes>
          </div>
        </Router>
  );
}

export default App;
