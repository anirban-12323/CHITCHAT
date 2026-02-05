import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

import { loginUserThunk } from "../../store/slice/user/userThunk";
const Login = () => {
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  const handleInputChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      await dispatch(loginUserThunk(loginData)).unwrap();
      // await dispatch(getUserProfileThunk()).unwrap();
      navigate("/");
    } catch (err) {
      toast.error(err || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center p-6  min-h-screen">
      <div className="max-w-[40rem] w-full  flex flex-col gap-5 bg-base-200 p-6 rounded-lg">
        <h2 className="text-2xl front-semibold">Please Login..!!</h2>
        <label className="input input-bordered flex items-center gap-2">
          <FaUserAlt />
          <input
            type="text"
            name="username"
            className="grow"
            placeholder="username"
            onChange={handleInputChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <FaKey />
          <input
            type="password"
            name="password"
            placeholder="Password"
            class="grow"
            onChange={handleInputChange}
          />
        </label>
        <button className="btn btn-primary" onClick={handleLogin}>
          Log in
        </button>
        <p className="flex gap-1">
          Don't have an acount?
          <Link to="/signup" className="text-blue-400 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
