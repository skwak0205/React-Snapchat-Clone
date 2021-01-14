import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectImage } from '../../../features/appSlice';
import { db } from '../../../firebase';
import { Avatar } from '@material-ui/core';
import ReactTimeago from 'react-timeago';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import './Chat.css';

const Chat = ({ id, profilePic, username, timestamp, imageUrl, read }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const open = () => {
    if (!read) {
      dispatch(selectImage(imageUrl));
      console.log(id);

      db.collection('posts').doc(id).set(
        {
          read: true,
        },
        { merge: true }
      );

      history.push('/chats/view');
    }
  };

  return (
    <div className='chat' onClick={open}>
      <Avatar src={profilePic} className='chat__avatar' />

      <div className='chat__info'>
        <h4>{username}</h4>
        <p>
          {!read && 'Tap to view - '}{' '}
          <ReactTimeago date={new Date(timestamp?.toDate()).toLocaleString()} />
        </p>
      </div>

      {!read && <StopRoundedIcon className='chat__readIcon' />}
    </div>
  );
};

export default Chat;
