import React, { ChangeEvent, FormEvent } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateCurrentUser,
  updateProfile,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { auth, storage, usersCollection } from "../../api/firebase";
import LoadingSpinner from "../../ui/loader";
import { FcAddImage, FcGoogle } from "react-icons/fc";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc } from "firebase/firestore";
import { useAuth } from "../../context/registerContext";
interface user {
  email: string;
  password: string;
  confirm: string;
  avatar: File;
}

const Register = () => {
  const [ccount, setAccount] = React.useState({});
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({} as user);
  function handleUserInput(e: ChangeEvent<HTMLInputElement>) {
    const { value, name, type, files } = e.currentTarget;
    setUser((e) => {
      return { ...e, [name]: type == "file" ? files?.[0] : value };
    });
  }

  async function signUp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const { email, confirm, password } = user;
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
          "images/" + user.avatar.name + Date.now()
        );
        const uploadTask = uploadBytesResumable(storageRef, user.avatar);
        await uploadTask.on(
          "state_changed",
          // (snapshot) => {},
          // (error) => {
          //   console.log("error");
          // },
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              updateProfile(Credential.user, {
                photoURL: downloadURL,
                displayName: email,
              }).then(async () =>
                addDoc(usersCollection, {
                  User_ID: Credential.user.uid,
                  Username: Credential.user.displayName,
                  Email: Credential.user.email,
                  photoURL: Credential.user.photoURL,
                  password,
                })
              );
            });
          }
        );
        setLoading(false);
        alert("account created");
        setError("");
        setAccount(Credential.user);
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
    const storageRef = ref(storage, "images/" + user.avatar.name);
    const uploadTask = uploadBytesResumable(storageRef, user.avatar);
    await uploadTask.on("state_changed", () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        updateProfile(account.user, {
          photoURL: downloadURL,
        }).then(() => {
          addDoc(usersCollection, {
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
                alt={user.avatar.name}
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
          <button className="btn">submit</button>
          <p className="text-red-500 text-sm text-center">{error && error}</p>
        </form>
        <button
          onClick={() => {
            signOut(auth);
            localStorage.removeItem("user");
          }}
          className="btn"
        >
          {/* {signWithGoogle} */}
          log out
        </button>
        <button
          onClick={signWithGoogle}
          className="btn p-2 flex gap-2 border-[1px] rounded-md  shadow-sm items-center w-xs mx-auto"
        >
          <FcGoogle /> <span className="block">google</span>
        </button>
      </div>
    </div>
  );
};

export default Register;
