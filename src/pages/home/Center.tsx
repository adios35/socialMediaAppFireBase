import React from "react";
import Posts from "./Posts";
import "./style.css";
import { FcAddImage } from "react-icons/fc";
import { auth, db, postsCollection, storage } from "../../api/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, doc, setDoc } from "firebase/firestore";
import LoadingSpinner from "../../ui/loader";
import useUserInfo from "../../hooks/useGetUser";
import { useAuth } from "../../context/registerContext";
const Center = () => {
  const { user } = useAuth();
  const { Username, photoURL, Email } = useUserInfo(auth.currentUser?.uid);
  const [percentage, setPercentage] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState<any>(null);
  const [post, setPost] = React.useState<string>("");

  async function addPost() {
    if (!post) return setError("tuliskan post anda");
    try {
      setLoading(true);
      if (image) {
        const storageRef = await ref(
          storage,
          "postImages/" + Date.now() + image.name
        );
        await uploadBytesResumable(storageRef, image).then(() => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(storageRef).then(async (downloadURL) => {
            await setDoc(doc(db, "posts", crypto.randomUUID()), {
              user_id: auth.currentUser?.uid,
              author: auth.currentUser?.displayName || auth.currentUser?.email,
              image: downloadURL,
              content: post,
              timestamp: Date.now(),
              likes: [],
              comments: [],
            }).then(() => {
              setLoading(false);
              setImage(null);

              setError("");
              setPost("");
            });
          });
        });
      } else {
        await addDoc(postsCollection, {
          user_id: auth.currentUser?.uid,
          author: auth.currentUser?.displayName || auth.currentUser?.email,
          image: null,
          content: post,
          timestamp: Date.now(),
          likes: 0,
          comments: [],
        }).then(() => {
          alert("berhasil");
          setLoading(false);
          setPost("");
        });
      }
    } catch (error) {
      alert("error " + error.message);
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <div className="container scroll-smooth overflow-y-scroll h-full flex-1 basis-[150px] ">
      <div className="center pl-[15px] ">
        {loading && <LoadingSpinner percentage={percentage} />}
        <h1 className="text-2xl  py-3 text-gray-700 text-semibold capitalize">
          hello to my simple social media app
        </h1>
        <div className="post bg-white relative w-full   border-[1px] p-2 rounded-md shadow-md flex gap-2">
          <div className="profile">
            <img
              src={user?.photoURL!}
              className="photo h-11 w-12 rounded-full "
              alt={Username || Email}
            />
          </div>
          <div className="userInput w-full">
            <p className="text-gray-600">{Username || Email}</p>
            <textarea
              placeholder="create post..."
              rows={5}
              value={post}
              //@ts-ignore
              onChange={(e) => setPost(e.target.value)}
              className="w-full  resize-none  outline-none min-h-[100px] border-b-2  p-2"
            />
            {error && <p className="text-red-500">{error}</p>}

            <div className="bottom my-2  flex justify-between items-center">
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  className="image max-w-[50px] max-h-[50px] rounded-xl  shadow-md"
                />
              )}
              <label
                htmlFor="image"
                className="absolute cursor-pointer active:scale-105 duration-200 right-2 bottom-[4.7rem]"
              >
                <FcAddImage className="" size={36} />
                <input
                  onChange={(e) => {
                    //@ts-ignore
                    const file = e.target.files[0];
                    setImage(file);
                  }}
                  type="file"
                  name="image"
                  id="image"
                  className="hidden"
                />
              </label>
              <button
                onClick={addPost}
                className="btn p-2 rounded-md border-[1px] w-32 hover:bg-gray-300 bg-blue-400 hover:text-white text-white duration-200 ml-auto self-end block"
              >
                kirim
              </button>
            </div>
          </div>
        </div>
        <Posts />
      </div>
    </div>
  );
};

export default Center;
