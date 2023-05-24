import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import SearchPage from './pages/Search.page';
import HomePage from './pages/Home.page';
import ProfilePage from './pages/Profile.page';
import AddEntryPage from './pages/AddEntry.page';
import LoginPage from "./pages/Login.page";
import CreateUserPage from "./pages/CreateUser.page";
import './App.css';

const queryClient = new QueryClient();

function App() {
  const [token, setToken] = useState('');

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
              <Route path='/' element={<HomePage token={token} setToken={setToken}/> }/>
              <Route path='/profile' element={<ProfilePage token={token} setToken={setToken}/>}/>
              <Route path='/add' element={<AddEntryPage token={token} setToken={setToken}/>}/>
              <Route path='/search' element={<SearchPage token={token} setToken={setToken}/>}/>
              <Route path="/login" element={<LoginPage token={token} setToken={setToken}/> }/>
              <Route path="/user" element={<CreateUserPage token={token} setToken={setToken}/> }/>
            </Routes>
          </div>
        </Router>
      </QueryClientProvider>
  );
}

export default App;
