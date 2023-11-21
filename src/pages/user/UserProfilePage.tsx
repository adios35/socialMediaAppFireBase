import React, { useState, useEffect } from "react";

// import { Firestore } from "firebase/firestore";
import UserLoadingSkeleton from "../../ui/UserLoadingSkeleton";
import { AiOutlineLeft } from "react-icons/ai";
import Post from "../../pages/home/post";
import { useNavigate, useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db, postsCollection } from "../../api/firebase";
import { PostInterface } from "../../api/types/postType";
import { useAuth } from "../../context/registerContext";
import { getUserDataFn } from "../../utils/User";
import "./style.css";
interface user {
  Username: string;
  Email: string;
  User_ID;
  photoURL: string;
  followers: string[];
  following: string[];
}

const UserProfile = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [isFetching, setIsFetching] = React.useState(false);

  const [error, setError] = React.useState("");
  const [userPosts, setUserPosts] = React.useState<null | PostInterface[]>();

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = React.useState({} as user);
  const { id } = useParams();

  async function getUserData(id) {
    // console.log(userPosts);

    const userColl = doc(db, "users", id);
    const data = await getDoc(userColl)
      .then((user) => {
        //@ts-ignore
        setUser(user.data());
        setIsLoading(false);
      })
      .catch((err) => setError(err.message));
  }

  React.useEffect(() => {
    getUserData(id);
    const q = query(postsCollection, where("user_id", "==", `${id}`));
    const unsubscribe = onSnapshot(q, async (data) => {
      const result = await data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      //@ts-ignore
      setUserPosts(result);
      window.scrollTo(0, 0);
    });
    return () => {
      unsubscribe();
    };
  }, [id, isFetching]);

  const isFollowing = React.useMemo(
    () => user?.followers?.includes(currentUser?.uid!),
    [user]
  );
  // console.log(isFollowing, currentUser?.uid);
  async function handleFollowing(id) {
    setIsFetching(true);

    const currentUserDb = await getUserDataFn(currentUser?.uid);
    // console.log(currentUserDb.following);

    const following = [...currentUserDb?.following];
    const followers = [...user.followers];
    // const q = await query(usersCollection, where("User_ID", "==", id));

    if (followers.includes(currentUser?.uid!)) {
      followers.splice(followers.indexOf(currentUser?.uid!), 1);
      following.splice(following.indexOf(user.User_ID), 1);
      // console.log(followers, following);
    } else {
      followers.push(currentUser?.uid!);
      following.push(user.User_ID);
      // console.log(followers, following);
    }
    const docref = doc(db, "users", id);
    await updateDoc(docref, { followers }).then(() => {
      setError("");
      // setCommentText("");
    });
    const currentUserDocref = doc(db, "users", currentUser?.uid!);
    await updateDoc(currentUserDocref, { following }).then(() => {
      // alert("followed");
      setError("");
      // setCommentText("");
    });
    setIsFetching(false);
  }

  // useEffect(() => {
  // }, []);
  if (error) return <h1 className="text-red-500">{error}</h1>;
  return (
    <div className="flex flex-col relative p-5 items-center justify-center space-y-4">
      {isLoading ? (
        <UserLoadingSkeleton />
      ) : (
        <>
          <button
            onClick={() => navigate(-1)}
            className="back-btn text-2xl absolute top-4 left-4 bg-white rounded-xl text-gray-500 duration-300 active:scale-125 p-2"
          >
            <AiOutlineLeft />
          </button>
          <img
            className="w-32 h-32 rounded-full border-blue-300 border-2"
            src={user.photoURL}
            alt="Profile"
          />
          <div className="mx-auto flex text-center gap-3">
            <div className="flex flex-col">
              <p className="font-bold">{userPosts?.length}</p>
              <p className="text-gray-500">posts</p>
            </div>
            <div className="flex flex-col">
              <p className="font-bold">{user.followers.length}</p>
              <p className="text-gray-500">followers</p>
            </div>
            <div className="flex flex-col">
              <p className="font-bold">{user.following.length}</p>
              <p className="text-gray-500">following</p>
            </div>
          </div>
          <h2 className="text-lg font-bold">{user.Username || user.Email}</h2>

          {id !== auth.currentUser?.uid && (
            <div className="flex gap-2">
              <button
                onClick={() => handleFollowing(id)}
                className={`${
                  isFollowing
                    ? "bg-gray-300 text-gray-700"
                    : "bg-blue-400 text-white"
                } p-2 rounded-md flex`}
              >
                {isFetching && (
                  <div
                    className=" inline-block h-5 w-5 mr-2 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-secondary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                  >
                    <span className="!absolute  !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                      Loading...
                    </span>
                  </div>
                )}
                <span>{isFollowing ? "following" : "follow"}</span>
              </button>
              <button
                onClick={() => navigate(`/chat/${id}`)}
                className="bg-blue-400 p-2 px-3 rounded-md active:scale-125 duration-300 text-white"
              >
                pesan
              </button>
            </div>
          )}
          <p className="text-gray-600 text-sm">
            {/* <span className="font-bold">{followerCount}</span> followers */}
          </p>
          <button
          // className={`px-4 py-2 rounded-full ${
          // //   isFollowing ? "bg-gray-500 text-white" : "bg-blue-500 text-white"
          // }`}
          >
            {/* {isFollowing ? "Following" : "Follow"} */}
          </button>
          <p className="text-gray-600">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet est risus.`}</p>
        </>
      )}
      <p>posts:</p>
      <div className="max-w-md">
        {userPosts?.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      </div>
    </div>
  );
};

export default UserProfile;
