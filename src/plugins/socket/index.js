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

export const listeningUndoAction = (conn, callback) => {
  conn.socket.on('UNDO', res => {
    callback(res);
  });
};

export const sendUndoAction = conn => {
  conn.socket.emit(`${conn.room}`, {
    event: 'UNDO',
    msg: 'PLEASE UNDO'
  });
};

export const listeningReconcileAction = (conn, callback) => {
  conn.socket.on('RECONCILE', res => {
    callback(res);
  });
};

export const sendReconcileAction = conn => {
  conn.socket.emit(`${conn.room}`, {
    event: 'RECONCILE',
    msg: 'PLEASE RECONCILE'
  });
};

export const listeningSurrenderAction = (conn, callback) => {
  conn.socket.on('SURRENDER', res => {
    callback(res);
  });
};

export const sendSurrenderAction = conn => {
  conn.socket.emit(`${conn.room}`, {
    event: 'SURRENDER',
    msg: 'PLEASE SURRENDER'
  });
};

export default connectServer;
