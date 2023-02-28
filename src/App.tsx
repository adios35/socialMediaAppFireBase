import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/register";
import NavBar from "./components/navbar";
import Exercise from "./Exercise";
import ImageUploader from "./Exercise";
import Test from "./api/test/test";
import Home from "./pages/home/Home";
import IsAuth from "./protected/isAuth";
interface lol {
  name: string;
  age: number;
}
const App = ({ age, name }: lol) => {
  return (
    <div className="">
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <IsAuth>
              <Home />
            </IsAuth>
          }
        />
      </Routes>
      {/* <Test /> */}
    </div>
  );
};

export default App;
