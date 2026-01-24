import React from "react";
import { FaSearch } from "react-icons/fa";
import User from "./User";

function UserSideBar() {
  return (
    <div className="max-w-[20rem] w-full  h-screen flex flex-col border-r-white">
      {/* //app name */}
      <h2 className="bg-black px-3 py-2 text-xl font-semibold text-[#646EE4]">
        CHIT CHAT
      </h2>
      {/* //search box */}
      <div className="p-3">
        <label class="input input-bordered flex items-center gap-2">
          <input type="text" class="grow" placeholder="Search" />

          <FaSearch />
        </label>
      </div>
      <div className="h-full  overflow-y-auto  px-3">
        <User />
        <br />
        <User />
        <br />
        <User />
        <br />
        <User />
        <br />
        <User />
        <br />
        <User />
        <br />
        <User />
        <br />
        <User />
        <br />
        <User />
        <br />
        <User />
        <br />
        <User />
        <br />
        <User />
        <br />
        <User />
      </div>
      <div className="flex  items-center justify-between p-3 border-r-black">
        <div class="avatar">
          <div class="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <button class="btn btn-primary btn-sm">Logout</button>
      </div>
    </div>
  );
}

export default UserSideBar;
