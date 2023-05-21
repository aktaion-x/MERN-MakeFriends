// css
import './index.css';
// libraies
import React from 'react';
import ReactDOM from 'react-dom/client';
// components
import App from './App';
// contexts
import { AuthContextProvider } from './contexts/AuthContext';
import { FriendsContextProvider } from './contexts/FriendsContext';
import { NewUsersContextProvider } from './contexts/NewUsersContext';
import { AllChatsContextProvider } from './contexts/AllChatsContext';
import { FriendRequestsContextProvider } from './contexts/FriendRequestsContext';
import { PendingRequestsContextProvider } from './contexts/PendingRequestsContext';
import { HelperContextProvider } from './contexts/HelperContext';
import { ChatContextProvider } from './contexts/ChatContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <FriendsContextProvider>
        <NewUsersContextProvider>
          <FriendRequestsContextProvider>
            <AllChatsContextProvider>
              <ChatContextProvider>
                <PendingRequestsContextProvider>
                  <HelperContextProvider>
                    <App />
                  </HelperContextProvider>
                </PendingRequestsContextProvider>
              </ChatContextProvider>
            </AllChatsContextProvider>
          </FriendRequestsContextProvider>
        </NewUsersContextProvider>
      </FriendsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
