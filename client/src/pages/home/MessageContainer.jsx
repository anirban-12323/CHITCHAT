import React, { useEffect } from "react";
import Message from "./Message";
import User from "./User";

import { useDispatch, useSelector } from "react-redux";
import { getMessageThunk } from "../../store/slice/message/messageThunk";
import { setSelectedUser } from "../../store/slice/user/userSlice";
import SendMessage from "./SendMessage";
import MyProfile from "./MyProfile";

function MessageContainer() {
  const { selectedUser, activeScreen } = useSelector(
    (state) => state.userReducer,
  );
  const { messages } = useSelector((state) => state.messageReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getMessageThunk({ otherParticipantId: selectedUser?._id }));
    }
  }, [selectedUser]);
  return (
    <>
      {activeScreen === "profile" ? (
        <MyProfile />
      ) : !selectedUser ? (
        <div className="w-full flex items-center justify-center flex-col gap-5">
          <h2>Welcome to CHITCHAT</h2>
          <p className="text-xl">
            Please select a person to continue your chat !!
          </p>
        </div>
      ) : (
        <div className="h-screen w-full flex flex-col">
          <div className="p-3 border-b-white/20">
            <User userDetails={selectedUser} />
          </div>

          <div className="h-full overflow-y-auto p-3">
            {messages?.map((messageDetails) => (
              <Message
                key={messageDetails._id}
                messageDetails={messageDetails}
              />
            ))}
          </div>

          <SendMessage />
        </div>
      )}
    </>
  );
}

export default MessageContainer;
