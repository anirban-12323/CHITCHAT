import { Route, Router, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/authentication/Login";
import Signup from "./pages/authentication/Signup";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginUserThunk } from "./store/slice/user/userThunk";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginUserThunk());
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route></Route>
      </Routes>
    </>
  );
}

export default App;
