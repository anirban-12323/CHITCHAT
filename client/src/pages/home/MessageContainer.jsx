import React from "react";
import Message from "./Message";
import User from "./User";
import { IoMdSend } from "react-icons/io";

function MessageContainer() {
  return (
    <div className="h-screen w-full flex flex-col">
      <div className="p-3 border-b-white/10">
        <User />
      </div>

      <div className=" h-full overflow-y-auto p-3">
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>

      <div className="w-full p-3 flex gap-2">
        <input
          type="text"
          placeholder="Type here"
          class="input input-bordered input-primary w-full"
        />
        <button class="btn btn-square btn-outline btn-primary">
          <IoMdSend />
        </button>
      </div>
    </div>
  );
}

export default MessageContainer;
