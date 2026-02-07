import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageThunk } from "../../store/slice/message/messageThunk";
function SendMessage() {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    console.log("hello");
    console.log(message);
    dispatch(sendMessageThunk({ receiverId: selectedUser?._id, message }));
    setMessage("");
  };

  return (
    <div className="w-full p-3 flex gap-2">
      <input
        type="text"
        value={message}
        placeholder="Type here"
        className="input input-bordered input-primary w-full"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={handleSendMessage}
        class="btn btn-square btn-outline btn-primary"
      >
        <IoMdSend />
      </button>
    </div>
  );
}

export default SendMessage;
