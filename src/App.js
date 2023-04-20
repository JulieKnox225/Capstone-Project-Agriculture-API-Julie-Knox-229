import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SearchPage from './pages/Search.page';
import HomePage from './pages/Home.page';
import ProfilePage from './pages/Profile.page';
import './App.css';

function App() {
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
                <Link to='/search'>Search</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
            <Route path='/search' element={<SearchPage/>}/>
          </Routes>
        </div>
      </Router>
  );
}

export default App;
