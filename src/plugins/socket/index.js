/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable no-undef */
import io from 'socket.io-client';

let socket = null;

const connectServer = () => {
  socket = io.connect('http://localhost:55210');
  socket.emit('MATCHING', { username: 'anvh2' }, res => {
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

export const pairing = (conn, callback) => {
  conn.socket.on('PAIRING', res => {
    callback(res);
  });
};

export const listeningData = (conn, callback) => {
  conn.socket.on('DATA', res => {
    callback(res);
  });
};

export const listeningMsg = (conn, callback) => {
  conn.socket.on('MESSAGE', res => {
    callback(res);
  });
};

export const sendData = (conn, data) => {
  conn.socket.emit(`${conn.room}`, { event: 'DATA', data });
};

export const sendMsg = (conn, data) => {
  conn.socket.emit(`${conn.room}`, { event: 'MESSAGE', data });
};

export default connectServer;
