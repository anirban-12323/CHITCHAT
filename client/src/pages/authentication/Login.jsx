import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  const handleInputChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  console.log(loginData);
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
        <label class="input input-bordered flex items-center gap-2">
          <FaKey />
          <input
            type="password"
            name="password"
            placeholder="Password"
            class="grow"
            onChange={handleInputChange}
          />
        </label>
        <button class="btn btn-primary">Log in</button>
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
