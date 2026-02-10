import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function Message({ messageDetails }) {
  const { userProfile } = useSelector((state) => state.userReducer);
  const messageRef = useRef(null);

  useEffect(() => {
    if (messageRef?.current) {
      messageRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <div
        ref={messageRef}
        className={`chat ${userProfile?._id === messageDetails?.senderId ? "chat-end" : "chat-start"}`}
      >
        <div class="chat-image avatar">
          <div class="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <div class="chat-header">
          <time class="text-xs opacity-50">12:45</time>
        </div>
        <div class="chat-bubble">{messageDetails?.message}</div>
      </div>
    </>
  );
}

export default Message;
