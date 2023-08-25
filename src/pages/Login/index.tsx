import React, { FormEvent } from "react";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../api/firebase";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../ui/loader";

interface User {
  email: string;
  password: string;
}

const Login = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [user, setUser] = React.useState<User>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleUserInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.currentTarget;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const { email, password } = user;
    signInWithEmailAndPassword(auth, email, password)
      .then((Credential) => {
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
    <div className="container w-full h-screen  px-6 grid place-items-center mx-auto">
      <div className=" flex items-center justify-center max-w-[400px] w-full bg-gray-100">
        {loading && <LoadingSpinner />}
        <div className="login bg-white mx-auto w-full p-5 rounded-md shadow-md max-w-md h-full">
          <h1 className="text-3xl text-center text-gray-500 mb-5">Login</h1>
          <form onSubmit={submit} className="flex flex-col space-y-3">
            <label htmlFor="email" className="flex flex-col">
              <span className="text-gray-600 mb-1">Email</span>
              <input
                onChange={handleUserInput}
                required
                placeholder="Email"
                id="email"
                type="email"
                name="email"
                className="px-4 py-2 border rounded-md"
              />
            </label>
            <label htmlFor="password" className="flex flex-col">
              <span className="text-gray-600 mb-1">Password</span>
              <input
                onChange={handleUserInput}
                required
                placeholder="Password"
                id="password"
                type="password"
                name="password"
                className="px-4 py-2 border rounded-md"
              />
            </label>
            <button
              className="btn bg-blue-500 text-white hover:bg-blue-600 px-4 py-2"
              type="submit"
            >
              Submit
            </button>

            <p className="text-center text-red-600">{error}</p>
            <p className="text-sm text-center">
              Don't have an account?
              <Link className="text-blue-500" to="/register">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
