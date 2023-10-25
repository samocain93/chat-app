import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';

let socket;

const Chat = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const ENDPOINT = 'localhost:5000';

  const location = useLocation();
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    // console.log(name, room);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    // console.log(socket)

    socket.emit('join', { name, room }, (error) => {
      alert(error)
    });

    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [ENDPOINT, location.search]);

  return (
    <div>
      <h1>Chat</h1>
    </div>
  );
};

export default Chat;
