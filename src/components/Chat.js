/* eslint-disable react/no-array-index-key */
import React from 'react';
import { sendMsg } from '../plugins/socket';
import '../chat.css';

const Chat = data => {
  console.log(data);
  const msg = data.messages.map((value, index) => {
    if (value.type === 'send') {
      return (
        <div className="sent-chats">
          <div className="sent-msg">
            <p key={`msg_${index}`}>{value.msg}</p>
          </div>
        </div>
      );
    }
    if (value.type === 'receive') {
      return (
        <div className="received-chats">
          <div className="received-msg">
            <p>{value.msg}</p>
          </div>
        </div>
      );
    }
    return '';
  });

  return (
    <div className="container">
      <div className="chat-frame">
        <div className="msg-inbox">
          <div className="chats">
            <div className="msg-frame">{msg}</div>
          </div>
        </div>
      </div>
      <div className="write-msg">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="write message..."
            id="msg-box"
            name=""
            onKeyUp={e => {
              e.preventDefault();
              if (e.keyCode === 13 && e.target.id === 'msg-box') {
                data.setMessage({ type: 'send', msg: e.target.value });

                // send message to enemy
                console.log('connection', data.conn);
                if (data.conn !== undefined && data.conn.room !== '') {
                  sendMsg(data.conn, { type: 'receive', msg: e.target.value });
                }

                e.target.value = '';
              }
            }}
          />
          <div className="input-group-append">
            <span className="input-group-text">
              <i className="fa fa-paper-plane" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
