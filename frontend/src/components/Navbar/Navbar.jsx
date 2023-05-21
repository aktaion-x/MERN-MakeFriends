// css
import './Navbar.css';
// libraries
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
// hooks
import useLogout from '../../hooks/useLogout';
// useContexts
import useAuthContext from '../../hooks/ContextsHooks/useAuthContext';
// contexts
import { HelperContext } from '../../contexts/HelperContext';
// components
// import SearchBox from '../boxes/SearchBox/SearchBox';
import PendingRequestsMenu from '../menus/PendingRequestsMenu/PendingRequestsMenu';
import FriendRequestsMenu from '../menus/FriendRequestsMenu/FriendRequestsMenu';
import NotificationMenu from '../menus/NotificationMenu/NotificationMenu';

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const { dispatch } = useContext(HelperContext);
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const toggleMenu = (e) => {
    dispatch({ type: 'CLICK_MENUS' });
    const menus = document.querySelectorAll('.navbar .dropdown .menu');
    const target = e.target.parentElement.querySelector('.menu');
    if (target.classList.contains('active')) {
      unActiveAllMenus(menus);
      return;
    } else {
      unActiveAllMenus(menus);
      target.classList.add('active');
    }
  };
  const unActiveAllMenus = (menus) => {
    menus.forEach((menu) => {
      menu.classList.remove('active');
    });
  };
  return (
    <div className="nav-container">
      <nav>
        <h1 className="logo">
          <Link to="/">chatApp</Link>
        </h1>
        {/* {user && <SearchBox />} */}
        <div className="navbar">
          {!user && (
            <ul>
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
              </>
            </ul>
          )}
          {user && (
            <>
              <ul>
                <li className="dropdown">
                  <FriendRequestsMenu toggleMenu={toggleMenu} />
                </li>
                <li className="dropdown">
                  <PendingRequestsMenu toggleMenu={toggleMenu} />
                </li>
                <li className="dropdown">
                  <NotificationMenu toggleMenu={toggleMenu} />
                </li>
                <li className="logout">
                  <button onClick={handleLogout} className="btn">
                    Logout
                  </button>
                </li>
              </ul>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
