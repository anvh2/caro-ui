/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable no-undef */
import io from 'socket.io-client';

let socket = null;

const connectServer = () => {
  socket = io.connect('http://localhost:55210');
  socket.emit('matching', { username: 'anvh2' }, res => {
    if (res.code === 1) {
      console.log('res ok');
    } else {
      console.log('res not ok');
    }
  });

  // // pairing
  // let room = '';
  // socket.on('paired', data => {
  //   console.log(data.room);
  //   room = data.room;
  //   localStorage.setItem('room', room);
  // });

  // detect message from server
  // socket.on(`${room}`, message => {
  //   console.log(message);
  // });

  // conn.socket = socket;
  // conn.room = '';
  // conn.status = 'waiting';
  // console.log('connection', conn);
  return {
    socket,
    room: '',
    status: 'waiting'
  };
};

export const pairing = conn => {
  conn.socket.on('paired', data => {
    console.log('room', data.room);
    conn.room = data.room;
    conn.status = 'paired';
  });
};

export const listening = (conn, callback) => {
  conn.socket.on('COORDINATE', res => {
    callback(res);
  });
};

export default connectServer;
