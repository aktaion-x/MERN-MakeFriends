import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './contexts/AuthContext';
import { FriendsContextProvider } from './contexts/FriendsContext';
import { NewUsersContextProvider } from './contexts/NewUsersContext';
import { AllChatsContextProvider } from './contexts/AllChatsContext';
import { FriendRequestsContextProvider } from './contexts/FriendRequestsContext';
import { PendingRequestsContextProvider } from './contexts/PendingRequestsContext';
import { HelperContextProvider } from './contexts/HelperContext';
import { ChatContextProvider } from './contexts/ChatContext';

ReactDOM.createRoot(document.getElementById('root')).render(
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
)
