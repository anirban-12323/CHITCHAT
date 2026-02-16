import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserThunk } from "../../store/slice/user/userThunk";
import { setActiveScreen } from "../../store/slice/user/userSlice";

function UserSideBar() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const { otherUser, userProfile } = useSelector((state) => state.userReducer);
  const handleLogout = async () => {
    await dispatch(logoutUserThunk());
  };

  const handleDpClick = async () => {
    await dispatch(setActiveScreen("profile"));
  };

  useEffect(() => {
    if (!searchValue) {
      setUsers(otherUser);
    } else {
      setUsers(
        otherUser.filter((user) => {
          return (
            user.username.toLowerCase().includes(searchValue.toLowerCase()) ||
            user.fullname
              .toLowerCase()
              .includes(searchValue.toLocaleLowerCase())
          );
        }),
      );
    }
  }, [searchValue, otherUser]);

  return (
    <div className="max-w-[20rem] w-full  h-screen flex flex-col border-r-white">
      {/* //app name */}
      <h2 className="bg-black px-3 py-2 text-xl font-semibold text-[#646EE4]">
        CHIT CHAT
      </h2>
      {/* //search box */}
      <div className="p-3">
        <label class="input input-bordered flex items-center gap-2">
          <input
            type="text"
            class="grow"
            placeholder="Search"
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <FaSearch />
        </label>
      </div>
      <div className="h-full  overflow-y-auto  px-3 flex flex-col gap-3">
        {users?.map((userDetails) => {
          return <User key={userDetails._id} userDetails={userDetails} />;
        })}
      </div>
      <div className="flex  items-center justify-between p-3 border-r-black">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
              <img src={userProfile?.avatar} onClick={handleDpClick} />
            </div>
          </div>
          <h2>{userProfile?.username}</h2>
        </div>

        <button onClick={handleLogout} class="btn btn-primary btn-sm">
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserSideBar;
