import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/register";
import NavBar from "./components/navbar";
import Home from "./pages/home/Home";
import IsAuth from "./protected/isAuth";
import Test from "./api/test/test";
import UserProfile from "./pages/user/UserProfilePage";
interface lol {
  name: string;
  age: number;
}
const App = ({ age, name }: lol) => {
  return (
    <div className="bg-gray-100">
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/test" element={<Test />} /> */}
        <Route
          path="/"
          element={
            <IsAuth>
              <Home />
            </IsAuth>
          }
        />
        <Route
          path="user/:id"
          element={
            <IsAuth>
              <UserProfile />
            </IsAuth>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
