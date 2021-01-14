import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/appSlice';
import { auth } from './firebase';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import ChatView from './components/ChatView/ChatView';
import Chats from './components/Chats/Chats';
import Preview from './components/Preview/Preview';
import WebcamCapture from './components/WebcamCapture/WebcamCapture';
import './App.css';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className='app'>
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <img
              className='app__logo'
              src='https://lakeridgenewsonline.com/wp-content/uploads/2020/04/snapchat.jpg'
              alt=''
            />

            <div className='app__body'>
              <div className='app__bodyBackground'>
                <Switch>
                  <Route path='/chats/view'>
                    <ChatView />
                  </Route>
                  <Route path='/chats'>
                    <Chats />
                  </Route>
                  <Route path='/preview'>
                    <Preview />
                  </Route>
                  <Route exact path='/'>
                    <WebcamCapture />
                  </Route>
                </Switch>
              </div>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
