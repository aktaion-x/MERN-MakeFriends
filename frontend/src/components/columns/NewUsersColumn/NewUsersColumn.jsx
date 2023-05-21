// css
import '../columns.css';
// libraries
import { useEffect } from 'react';
// hooks
import useNewUsers from '../../../hooks/useNewUsers';
import usePendingRequests from '../../../hooks/usePendingRequests';
// useContexts
import useNewUsersContext from '../../../hooks/ContextsHooks/useNewUsersContext';
import usePendingRequestsContext from '../../../hooks/ContextsHooks/usePendingRequestsContext';

const NewUsersColumn = () => {
  const { dispatch: dispatchNewUsers, newUsers } = useNewUsersContext();
  const { dispatch: dispatchPendingRequest } = usePendingRequestsContext();
  const { postPendingRequest } = usePendingRequests();
  const { getNewUsers, isPending, error } = useNewUsers();

  useEffect(() => {
    const getUsers = async () => {
      const result = await getNewUsers();
      if (result) {
        dispatchNewUsers({ type: 'SET_NEW_USERS', payload: result.data });
      }
    };
    getUsers();
  }, []);
  const handleRequestFriend = async (user) => {
    const result = await postPendingRequest(user._id);
    if (result) {
      dispatchNewUsers({ type: 'REMOVE_NEW_USER', payload: user._id });
      dispatchPendingRequest({ type: 'ADD_PENDING_REQUEST', payload: user });
    }
  };
  return (
    <div className="column new-users-column">
      <h2>New Users</h2>
      {isPending && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      {newUsers && newUsers.length === 0 && <div>No Users yet</div>}
      {newUsers && newUsers.length !== 0 && (
        <ul>
          {newUsers.map((user) => (
            <li key={user._id}>
              <div className="user">
                <div className="user-holder">
                  <div className="img">
                    <img src={user.userImage.url} alt="" />
                  </div>
                  <div className="user-info">
                    <h4>{user.name}</h4>
                    <span className="username">{user.username}</span>
                  </div>
                </div>
                <div className="btns">
                  <span onClick={() => handleRequestFriend(user)} className="material-symbols-outlined">
                    person_add
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

export default NewUsersColumn;
