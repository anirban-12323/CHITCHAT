import React from "react";

function User() {
  return (
    <div className=" flex gap-3items-center ">
      <div className="avatar offline">
        <div className="w-12 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <div>
        <h2 className="line-clamp-1">Full Name</h2>
        <p className="text-xs">username</p>
      </div>
    </div>
  );
}

export default User;
