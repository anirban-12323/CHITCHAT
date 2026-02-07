import React from "react";
import { setSelectedUser } from "../../store/slice/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

function User({ userDetails }) {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
  // console.log(selectedUser);
  const handleUserClick = () => {
    dispatch(setSelectedUser(userDetails));
  };
  return (
    <div
      onClick={handleUserClick}
      className={`flex gap-5 items-center  hover:bg-gray-700 rounded-lg py-1 px-2  ${userDetails?._id === selectedUser?._id && "bg-gray-700"}`}
    >
      <div className="avatar online">
        <div
          className="  w-12 h-12 rounded-full bg-primary text-white
      grid place-items-center
      text-lg font-bold leading-none
      select-none"
        >
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <div>
        <h2 className="line-clamp-1">{userDetails?.fullname}</h2>
        <p className="text-xs">{userDetails?.username}</p>
      </div>
    </div>
  );
}

export default User;
