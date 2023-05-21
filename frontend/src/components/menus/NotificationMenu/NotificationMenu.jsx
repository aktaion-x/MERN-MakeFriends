// css
import '../menu.css';

const NotificationMenu = ({ toggleMenu }) => {
  const handleClick = async (e) => {
    toggleMenu(e);
  };
  return (
    <div className="notification-menu">
      <span onClick={handleClick} className="material-symbols-outlined">
        notifications
      </span>
      <div className="menu">
        <h3>Notifications</h3>
        <ul className="users">
          <li>
            <div className="user">
              <div className="user-holder">
                <div className="img">
                  <img src="https://res.cloudinary.com/dgtzhvtwv/image/upload/v1683748089/users/miladss/20230327_213133_wlwrh1.jpg" alt="" />
                </div>
                <div className="user-info">
                  <h5>Milad Ahmad</h5>
                  <span className="username">miladss</span>
                </div>
              </div>
              <button className="btn">Confirm</button>
            </div>
          </li>
          {/* <div className="empty-menu">No Notifications!</div> */}
        </ul>
      </div>
    </div>
  );
};

export default NotificationMenu;
