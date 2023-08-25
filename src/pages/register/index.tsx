import React, { ChangeEvent, FormEvent } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from "../../api/firebase";
import LoadingSpinner from "../../ui/loader";
import { FcAddImage, FcGoogle } from "react-icons/fc";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useAuth } from "../../context/registerContext";
import { Link, useNavigate } from "react-router-dom";

interface User {
  username: string;
  email: string;
  password: string;
  confirm: string;
  avatar: File | null;
}

const Register = () => {
  const navigate = useNavigate();

  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState<User>({
    username: "",
    email: "",
    password: "",
    confirm: "",
    avatar: null,
  });

  function handleUserInput(e: ChangeEvent<HTMLInputElement>) {
    const { value, name, type, files } = e.currentTarget;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: type === "file" ? files?.[0] : value,
    }));
  }

  async function signUp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const { email, confirm, password, username } = user;
    if (password !== confirm) {
      setLoading(false);
      setError("Passwords do not match");
      return;
    }

    try {
      const account = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const storageRef = ref(
        storage,
        "images/" + user.avatar!.name! + Date.now()
      );
      const uploadTask = uploadBytesResumable(storageRef, user.avatar!);
      await uploadTask.on("state_changed", () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateProfile(account.user, {
            photoURL: downloadURL,
            displayName: username,
          });
        });
      });

      setError("");
      setLoading(false);
      alert("Account created");
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  return (
    <div className="w-screen h-screen px-6 grid place-items-center">
      {loading && <LoadingSpinner />}
      <div className="login bg-white mx-auto w-full p-3 rounded-md shadow-md max-w-md">
        <h1 className="text-3xl text-center text-gray-500 mb-5">Register</h1>
        <form onSubmit={signUp} className="flex flex-col space-y-3">
          <label htmlFor="email" className="flex flex-col">
            <span className="text-gray-600 mb-1">Email</span>
            <input
              onChange={handleUserInput}
              required
              placeholder="Email"
              id="email"
              type="email"
              name="email"
              className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
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
              className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </label>
          <label htmlFor="confirm" className="flex flex-col">
            <span className="text-gray-600 mb-1">Confirm Password</span>
            <input
              onChange={handleUserInput}
              required
              placeholder="Confirm password"
              id="confirm"
              name="confirm"
              type="password"
              className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </label>
          <label htmlFor="avatar" className="flex items-center gap-2">
            <FcAddImage
              size={50}
              className="cursor-pointer duration-300 block hover:scale-105"
            />
            {user.avatar && (
              <img
                className="rounded-full max-w-10 max-h-10"
                src={URL.createObjectURL(user.avatar)}
                alt={user.avatar.name!}
              />
            )}
            <input
              onChange={handleUserInput}
              required
              className="hidden"
              id="avatar"
              name="avatar"
              type="file"
            />
          </label>
          <button
            className="btn bg-blue-400 text-white hover:bg-blue-500 px-4 py-2 rounded-md duration-300"
            type="submit"
          >
            Submit
          </button>
          <p className="text-red-500 text-sm text-center">{error}</p>
        </form>
        <p className="text-gray-600 text-sm text-center">
          Already have an account?{" "}
          <Link className="text-blue-400" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
