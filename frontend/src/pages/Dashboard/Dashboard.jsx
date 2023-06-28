// css
import './Dashboard.css';
// components
import ChatsColumn from '../../components/columns/ChatsColumn/ChatsColumn';
import FriendsColumn from '../../components/columns/FriendsColumn/FriendsColumn';
import NewUsersColumn from '../../components/columns/NewUsersColumn/NewUsersColumn';
import ColumnsController from '../../components/ColumnsController/ColumnsController';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <FriendsColumn />
      <NewUsersColumn />
      {/* <ChatsColumn /> */}
      <ColumnsController />
    </div>
  );
};

export default Dashboard;
