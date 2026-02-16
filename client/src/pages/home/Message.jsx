import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function Message({ messageDetails }) {
  const { userProfile, selectedUser } = useSelector(
    (state) => state.userReducer,
  );
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
              src={
                userProfile?._id === messageDetails?.senderId
                  ? userProfile?.avatar
                  : selectedUser?.avatar
              }
            />
          </div>
        </div>
        <div class="chat-header"></div>
        <div class="chat-bubble">{messageDetails?.message}</div>
      </div>
    </>
  );
}

export default Message;
