import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/register";
import NavBar from "./components/navbar";
import Exercise from "./Exercise";
import ImageUploader from "./Exercise";
import Home from "./pages/home/Home";
import IsAuth from "./protected/isAuth";
import Test from "./api/test/test";
interface lol {
  name: string;
  age: number;
}
const App = ({ age, name }: lol) => {
  return (
    <div className="bg-gray-100">
      <NavBar />
      <Routes>
        <Route path="/test" element={<Test />} />
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
      </Routes>
    </div>
  );
};

export default App;
