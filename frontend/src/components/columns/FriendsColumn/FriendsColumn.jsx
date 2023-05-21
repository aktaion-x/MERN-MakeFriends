// css
import '../columns.css';
// libraries
import { useEffect } from 'react';
// hooks
import useFriends from '../../../hooks/useFriends';
// useContexts
import useFriendsContext from '../../../hooks/ContextsHooks/useFriendsContext';
import useNewUsersContext from '../../../hooks/ContextsHooks/useNewUsersContext';

const FriendsColumn = () => {
  const { getFriends, removeFriends, error, isPending } = useFriends();
  const { dispatch: dispatchFriends, friends } = useFriendsContext();
  const { dispatch: dispatchNewUsers } = useNewUsersContext();
  useEffect(() => {
    const get = async () => {
      const result = await getFriends();
      if (result) {
        dispatchFriends({ type: 'SET_FRIENDS', payload: result.data });
      }
    };
    get();
  }, []);
  const handleRemoveClick = async (user) => {
    const result = await removeFriends(user._id);
    if (result) {
      dispatchFriends({ type: 'REMOVE_FRIEND', payload: user._id });
      dispatchNewUsers({ type: 'ADD_NEW_USER', payload: user });
    }
  };
  return (
    <div className="column friends-column">
      <h2>Friends</h2>
      {isPending && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      {friends && friends.length === 0 && <div>No Friends yet</div>}
      {friends && friends.length !== 0 && (
        <ul>
          {friends.map((friend) => (
            <li key={friend._id}>
              <div className="user">
                <div className="user-holder">
                  <div className="img">
                    <img src={friend.userImage.url} alt="" />
                  </div>
                  <div className="user-info">
                    <h4>{friend.name}</h4>
                    <span className="username">{friend.username}</span>
                  </div>
                </div>
                <div className="btns">
                  <span className="material-symbols-outlined">send</span>
                  <span onClick={(_) => handleRemoveClick(friend)} className="material-symbols-outlined" style={{ color: 'red' }}>
                    person_remove
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendsColumn;
