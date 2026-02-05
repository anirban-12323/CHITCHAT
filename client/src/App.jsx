// import { Route, Routes } from "react-router-dom";
// import Home from "./pages/home/Home";
// import Login from "./pages/authentication/Login";
// import Signup from "./pages/authentication/Signup";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { getUserProfileThunk } from "./store/slice/user/userThunk";
// import { Toaster } from "react-hot-toast";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   const dispatch = useDispatch();
//   // useEffect(() => {
//   //   dispatch(loginUserThunk());
//   // }, []);

//   useEffect(() => {
//     dispatch(getUserProfileThunk());
//   }, [dispatch]);
//   return (
//     <>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           }
//         ></Route>

//         <Route path="/login" element={<Login />}></Route>
//         <Route path="/signup" element={<Signup />}></Route>
//         <Route></Route>
//       </Routes>

//       <Toaster position="top-center" reverseOrder={false} />
//     </>
//   );
// }

// export default App;

import { useEffect } from "react";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getUserProfileThunk } from "./store/slice/user/userThunk";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getUserProfileThunk());
    })();
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
