import React from 'react';
import '../chat.css';

const Chat = () => {
  return (
    <div className="container">
      <div className="chat-frame">
        <div className="msg-inbox">
          <div className="chats">
            <div className="msg-frame">
              <div className="received-chats">
                <div className="received-msg">
                  <p>Hi, my name is Home.</p>
                </div>
              </div>
              <div className="sent-chats">
                <div className="sent-msg">
                  <p>Hello</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="write-msg">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="write message..."
            name=""
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
