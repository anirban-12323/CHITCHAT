import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveScreen } from "../../store/slice/user/userSlice";
import { useState } from "react";
import { updateProfileThunk } from "../../store/slice/user/userThunk";
import { useEffect } from "react";

function MyProfile() {
  const { userProfile } = useSelector((state) => state.userReducer);
  const { activeScreen } = useSelector((state) => state.userReducer);

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
  });
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const handleClose = async () => {
    setTimeout(() => {
      dispatch(setActiveScreen("chat"));
    }, 500);
  };

  useEffect(() => {
    if (userProfile) {
      setFormData({
        fullname: userProfile?.fullname || "",
        username: userProfile?.username || "",
      });
    }
  }, [userProfile]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(updateProfileThunk(formData));
    setIsEditing(false);
  };
  return (
    <>
      <div className="relative h-full w-full bg-gray-900 p-6">
        <button
          className="absolute top-3 right-3 text-white text-xl hover:text-red-400 transition"
          onClick={handleClose}
        >
          x
        </button>

        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse gap-20">
            {!isEditing ? (
              <>
                <div className="card bg-base-100 w-96 shadow-xl">
                  <div className="card-body items-center text-center">
                    <h2 className="card-title ">
                      {" "}
                      FullName : {userProfile?.fullname}
                    </h2>

                    <h2 className="card-title ">
                      UserName : {userProfile?.username}
                    </h2>
                    <div className="card-actions">
                      <button
                        className="btn btn-primary mt-4"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Profile
                      </button>
                    </div>
                  </div>
                </div>

                {/* <form className="card-body">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Your Fullname</span>
                    </label>
                    <h2 className="text-2xl font-semibold">
                      {userProfile?.fullname}
                    </h2>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Your Username</span>
                    </label>
                    <p className="text-gray-400">@{userProfile?.username}</p>
                  </div>

                  <div className="form-control mt-6">
                    <button className="btn btn-primary">Update Profile</button>
                  </div>
                </form> */}
              </>
            ) : (
              <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <form className="card-body">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Your Fullname</span>
                    </label>
                    <input
                      type="text"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Your Username</span>
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="input input-bordered"
                      required
                    />
                  </div>

                  <div className="form-control mt-6">
                    <button
                      className="btn btn-primary mt-4"
                      onClick={handleSubmit}
                    >
                      Save Changes
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="btn btn-ghost"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Avatar */}
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-44 rounded-full ring ring-offset-2">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyProfile;
