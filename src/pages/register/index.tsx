import React, { ChangeEvent, FormEvent } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateCurrentUser,
  updateProfile,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, storage, usersCollection } from "../../api/firebase";
import LoadingSpinner from "../../ui/loader";
import { FcAddImage, FcGoogle } from "react-icons/fc";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, doc, setDoc } from "firebase/firestore";
import { useAuth } from "../../context/registerContext";
import { Link, useNavigate } from "react-router-dom";
interface user {
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
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
    avatar: null,
  });

  function handleUserInput(e: ChangeEvent<HTMLInputElement>) {
    const { value, name, type, files } = e.currentTarget;
    setUser((e) => {
      return { ...e, [name]: type == "file" ? files?.[0] : value };
    });
  }

  async function signUp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const { email, confirm, password, username } = user;
    if (password != confirm) {
      setLoading(false);
      setError("password tidak sesuai");
      return;
    }

    try {
      const account = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then(async (Credential) => {
        const storageRef = ref(
          storage,
          "images/" + user.avatar.name! + Date.now()
        );
        const uploadTask = uploadBytesResumable(storageRef, user.avatar!);
        await uploadTask.on(
          "state_changed",
          // (snapshot) => {},
          // (error) => {
          //   console.log("error");
          // },
          () => {
            const docRef = doc(db, "users", Credential.user.uid);
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await updateProfile(Credential.user, {
                  photoURL: downloadURL,
                  displayName: username,
                }).then(
                  async () =>
                    await setDoc(docRef, {
                      User_ID: Credential.user.uid,
                      Username: Credential.user.displayName || email,
                      Email: Credential.user.email,
                      photoURL: Credential.user.photoURL,
                      password,
                      following: [],
                      followers: [],
                    })
                );
              }
            );
          }
        );
        setLoading(false);
        alert("account created");
        setError("");
        navigate("/");
      });
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log(error);
    }
  }
  async function signWithGoogle() {
    const Provider = new GoogleAuthProvider();
    const account = await signInWithPopup(auth, Provider).then((user) => user);
    const storageRef = ref(storage, "images/" + user.avatar.name!);
    const uploadTask = uploadBytesResumable(storageRef, user.avatar!);
    await uploadTask.on("state_changed", () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        updateProfile(account.user, {
          photoURL: downloadURL,
        }).then(async () => {
          await addDoc(usersCollection, {
            User_ID: account.user.uid,
            Username: account.user.displayName,
            Email: account.user.email,
            password: null,
            photoURL: account.user.photoURL,
          });
        });
      });
    });
  }

  return (
    <div className="w-screen h-screen grid place-items-center  ">
      {loading && <LoadingSpinner />}
      <div className="login mx-auto w-full p-3 rounded-md shadow-md max-w-md">
        <h1 className="text-3xl text-center tetx-gray-500">
          welcome to ChatApp
        </h1>
        <form onSubmit={signUp} className="flex   flex-col mt-5 gap-3">
          {/* <label htmlFor="username">
            username
            <input
              onChange={handleUserInput}
              required
              placeholder="username"
              id="username"
              type="username"
              name="username"
            />
          </label> */}
          <label htmlFor="">
            email
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
            password
            <input
              onChange={handleUserInput}
              required
              placeholder="password"
              id="password"
              type="password"
              name="password"
            />
          </label>
          <label htmlFor="confirm">
            confirm
            <input
              onChange={handleUserInput}
              required
              placeholder="confirm password"
              id="confirm"
              name="confirm"
              type="text"
            />
          </label>
          <label htmlFor="avatar" className=" flex items-center gap-2">
            <FcAddImage
              size={50}
              className="cursor-pointer duration-300 block hover:scale-105"
            />
            {user.avatar && (
              <img
                className="rounded-full max-w-10 max-h-10 "
                src={URL.createObjectURL(user.avatar)}
                alt={user.avatar.name!}
              />
            )}
            <input
              onChange={handleUserInput}
              required
              className="hidden"
              placeholder="confirm password"
              id="avatar"
              name="avatar"
              type="file"
            />
          </label>
          <button className="btn w-full p-2 rounded-md duration-300 hover:bg-blue-300 bg-blue-400 text-white">
            submit
          </button>
          <p className="text-red-500 text-sm text-center">{error && error}</p>
        </form>

        {/* <button
          onClick={signWithGoogle}
          className="btn p-2 flex gap-2 border-[1px] rounded-md  shadow-sm items-center w-xs mx-auto"
        >
          <FcGoogle /> <span className="block">google</span>
</button> */}
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
