import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [signupData, setSignUpData] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmpassword: "",
  });

  const handleInputChange = (e) => {
    setSignUpData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(signupData);
  return (
    <div className="flex justify-center items-center p-6  min-h-screen">
      <div className="max-w-[40rem] w-full  flex flex-col gap-5 bg-base-200 p-6 rounded-lg">
        <h2 className="text-2xl front-semibold">Please SignUp..!!</h2>
        <label className="input input-bordered flex items-center gap-2">
          <FaUserAlt />
          <input
            type="text"
            className="grow"
            placeholder="Full Name"
            name="fullname"
            onChange={handleInputChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <FaUserAlt />
          <input
            type="text"
            className="grow"
            placeholder="Username"
            name="username"
            onChange={handleInputChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <FaKey />
          <input
            type="password"
            placeholder="Password"
            className="grow"
            name=" password"
            onChange={handleInputChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <FaKey />
          <input
            type="password"
            onChange={handleInputChange}
            name="confirmpassword"
            placeholder="Confirm Password"
            className="grow"
          />
        </label>
        <button class="btn btn-primary">Sing Up</button>
        <p className="flex gap-1">
          Already have an acount?
          <Link to="/login" className="text-blue-400 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
