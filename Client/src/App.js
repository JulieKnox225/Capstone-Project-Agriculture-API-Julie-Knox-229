import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import SearchPage from './pages/Search.page';
import HomePage from './pages/Home.page';
import ProfilePage from './pages/Profile.page';
import AddEntryPage from './pages/AddEntry.page';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
              <Route path='/' element={<HomePage/>}/>
              <Route path='/profile' element={<ProfilePage/>}/>
              <Route path='/add' element={<AddEntryPage/>}/>
              <Route path='/search' element={<SearchPage/>}/>
            </Routes>
          </div>
        </Router>
      </QueryClientProvider>
  );
}

export default App;
