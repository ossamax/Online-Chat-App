import React, { useState } from "react";
import { sendMessage, isTyping } from "react-chat-engine";
import { SendOutlined, PictureOutlined } from "@ant-design/icons";

const MessageForm = (props) => {
  const [value, setValue] = useState("");
  const { chatId, creds } = props;

  const handlSubmit = (event) => {
    event.preventDefault();
    const text = value.trim();

    if (text.length > 0) sendMessage(creds, chatId, { text });
    setValue("");
  };

  const handlChange = (event) => {
    setValue(event.target.value);
    isTyping(props, chatId);
  };

  const handlUpload = (event) => {
    sendMessage(creds, chatId, { files: event.target.files, text: "" });
  };

  return (
    <form className="message-form" onSubmit={handlSubmit}>
      <input
        type="text"
        className="message-input"
        placeholder="Send a message ..."
        value={value}
        onChange={handlChange}
        onSubmit={handlSubmit}
      />
      <label htmlFor="upload-button">
        <span className="image-button">
          <PictureOutlined className="picture-icon" />
        </span>
      </label>
      <input
        type="file"
        multiple={false}
        id="upload-button"
        style={{ display: "none" }}
        onChange={handlUpload}
      />
      <button type="submit" className="send-button">
        Send <SendOutlined />
      </button>
    </form>
  );
};

export default MessageForm;
