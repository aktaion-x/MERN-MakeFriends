// css
import './App.css';
// libraries
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
// components
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import About from './pages/About/About';
import Dashboard from './pages/Dashboard/Dashboard';
import useAuthContext from './hooks/ContextsHooks/useAuthContext';

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path='/' element={user ? <Navigate to='/dashboard' /> : <Home />} />
            <Route path='/login' element={user ? <Navigate to='/dashboard' /> : <Login />} />
            <Route path='/signup' element={user ? <Navigate to='/dashboard' /> : <Signup />} />
            <Route path='/dashboard' element={!user ? <Navigate to='/login' /> : <Dashboard />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
