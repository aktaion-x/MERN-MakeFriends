// css
import './Dashboard.css';
// components
import ChatsColumn from '../../components/columns/ChatsColumn/ChatsColumn';
import FriendsColumn from '../../components/columns/FriendsColumn/FriendsColumn';
import NewUsersColumn from '../../components/columns/NewUsersColumn/NewUsersColumn';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <FriendsColumn />
      <NewUsersColumn />
      <ChatsColumn />
    </div>
  );
};

export default Dashboard;
