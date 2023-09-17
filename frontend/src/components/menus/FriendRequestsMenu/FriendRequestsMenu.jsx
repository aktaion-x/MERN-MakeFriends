// css
import '../menu.css';
// libraries
import { useEffect } from 'react';
// hooks
import useFriendRequests from '../../../hooks/useFriendRequests';
// useContexts
import useFriendsContext from '../../../hooks/ContextsHooks/useFriendsContext';
import useNewUsersContext from '../../../hooks/ContextsHooks/useNewUsersContext';
import useFriendRequestsContext from '../../../hooks/ContextsHooks/useFriendRequestsContext';

const FriendRequestsMenu = ({ toggleMenu }) => {
  const { getFriendRequests, confirmFriendRequests, cancelFriendRequests, error, isPending } = useFriendRequests();
  const { dispatch: dispatchFriendRequests, friendRequests } = useFriendRequestsContext();
  const { dispatch: dispatchFriends } = useFriendsContext();
  const { dispatch: dispatchNewUsers } = useNewUsersContext();
  const handleClick = async (e) => {
    toggleMenu(e);
  };
  useEffect(() => {
    const get = async () => {
      const result = await getFriendRequests();
      if (result) {
        dispatchFriendRequests({ type: 'SET_FRIEND_REQUESTS', payload: result.data });
      }
    };
    get();
  }, []);
  const handleConfirmClick = async (user) => {
    const result = await confirmFriendRequests(user._id);
    if (result) {
      dispatchFriendRequests({ type: 'REMOVE_FRIEND_REQUEST', payload: user._id });
      dispatchFriends({ type: 'ADD_FRIEND', payload: user });
    }
  };
  const handleCancelClick = async (user) => {
    const result = await cancelFriendRequests(user._id);
    if (result) {
      dispatchFriendRequests({ type: 'REMOVE_FRIEND_REQUEST', payload: user._id });
      dispatchNewUsers({ type: 'ADD_NEW_USER', payload: user });
    }
  };
  return (
    <div className="friend-request-menu">
      <span onClick={handleClick} className="material-symbols-outlined friend-request">
        person
      </span>
      <div className="menu">
        <h3>Friend Requests</h3>
        <ul className="users">
          {isPending && <div>Loading...</div>}
          {error && <div className="error">{error}</div>}
          {friendRequests && friendRequests.length === 0 && <div className="empty-menu">No Friend Requests!</div>}
          {friendRequests &&
            friendRequests.length > 0 &&
            friendRequests.map((user) => (
              <li key={user._id}>
                <div className="user">
                  <div className="user-holder">
                    <div className="img">
                      <img src={user.userImage.url} alt="" />
                    </div>
                    <div className="user-info">
                      <h5>{user.name}</h5>
                      <span className="username">{user.username}</span>
                    </div>
                  </div>
                  <div className="buttons">
                    <button onClick={(_) => handleConfirmClick(user)} className="btn">
                      Confirm
                    </button>
                    <button onClick={(_) => handleCancelClick(user)} className="btn red">
                      Cancel
                    </button>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default FriendRequestsMenu;
