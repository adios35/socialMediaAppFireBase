import React, { FormEvent } from "react";
import { FcGoogle } from "react-icons/fc";
import "./style.css";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../api/firebase";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../ui/loader";
interface user {
  email: string;
  password: string;
}
const Login = () => {
  const [loading, setLoading] = React.useState(false);

  const [error, setError] = React.useState("");
  const [user, setUser] = React.useState({} as user);
  const navigate = useNavigate();
  function handleUserInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.currentTarget;
    setUser((e) => {
      return { ...e, [name]: value };
    });
  }
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const { email, password } = user;
    signInWithEmailAndPassword(auth, email, password)
      .then((Credential) => {
        setLoading(true);
        setLoading(false);
        localStorage.setItem("user", JSON.stringify(Credential.user));
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }

  return (
    <div className="w-screen h-screen grid place-items-center  ">
      {loading && <LoadingSpinner />}
      <div className="login bg-white mx-auto w-full p-5 rounded-md   shadow-md max-w-md">
        <h1 className="text-3xl text-center tetx-gray-500">Login</h1>
        <form
          onSubmit={submit}
          className="flex [&>*]:space-y-2   flex-col mt-5  gap-3"
        >
          <label htmlFor="">
            <span>Email</span>
            <input
              onChange={handleUserInput}
              required
              placeholder="email"
              id="email"
              type="email"
              name="email"
            />
          </label>
          <label htmlFor="password">
            <span>Passwords</span>
            <input
              onChange={handleUserInput}
              required
              placeholder="password"
              id="password"
              type="password"
              name="password"
            />
          </label>
          <button className="btn">submit</button>

          <p className="text-center text-red-600">{error}</p>
          <p className="text-sm text-center">
            Don't have an account?
            <Link className="text-blue-500" to={"/register"}>
              {" "}
              Register
            </Link>
          </p>
        </form>
        {/* <button
          onClick={signWithGoogle}
          className="btn p-2 flex gap-2 border-[1px] rounded-md  shadow-sm items-center w-xs mx-auto"
        >
          <FcGoogle /> <span className="block">google</span>
        </button> */}
      </div>
    </div>
  );
};

export default Login;
