// css
import '../menu.css';
// libraries
import { useEffect } from 'react';
// hooks
import usePendingRequests from '../../../hooks/usePendingRequests';
// useContexts
import usePendingRequestsContext from '../../../hooks/ContextsHooks/usePendingRequestsContext';
import useNewUsersContext from '../../../hooks/ContextsHooks/useNewUsersContext';

const PendingRequestsMenu = ({ toggleMenu }) => {
  const { getPendingRequests, cancelPendingRequest, error, isPending } = usePendingRequests();
  const { dispatch: dispatchPendingRequests, pendingRequests } = usePendingRequestsContext();
  const { dispatch: dispatchNewUsers } = useNewUsersContext();
  const handleClick = async (e) => {
    toggleMenu(e);
  };
  useEffect(() => {
    const get = async () => {
      const result = await getPendingRequests();
      if (result) {
        dispatchPendingRequests({ type: 'SET_PENDING_REQUESTS', payload: result.data });
      }
    };
    get();
  }, []);
  const handleCancelClick = async (user) => {
    const result = await cancelPendingRequest(user._id);
    if (result) {
      dispatchPendingRequests({ type: 'REMOVE_PENDING_REQUEST', payload: user._id });
      dispatchNewUsers({ type: 'ADD_NEW_USER', payload: user });
    }
  };
  return (
    <div className="pending-request-menu">
      <span onClick={handleClick} className="material-symbols-outlined pending-request">
        person
      </span>
      <div className="menu">
        <h3>Pending Requests</h3>
        <ul className="users">
          {isPending && <div>Loading...</div>}
          {error && <div className="error">{error}</div>}
          {pendingRequests && pendingRequests.length === 0 && <div className="empty-menu">No Pending Requests!</div>}
          {pendingRequests &&
            pendingRequests.length > 0 &&
            pendingRequests.map((user) => (
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
                  <button onClick={(_) => handleCancelClick(user)} className="btn red">
                    Cancel
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default PendingRequestsMenu;
