import React from "react";

import { AiOutlineHeart } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { GoComment } from "react-icons/go";
import { PostInterface } from "../../api/types/postType";
import { auth, db } from "../../api/firebase";
import { convertUnixTimestamp, timeAgo } from "../../utils/Date";
import { doc, updateDoc } from "firebase/firestore";
import useUserInfo from "../../hooks/useGetUser";
import { useAuth } from "../../context/registerContext";
import { Link } from "react-router-dom";

const post = ({ post }: { post: PostInterface }) => {
  // const { Username:authUserName, photoURL:authPhotoURL, Email } = useUserInfo(auth.currentUser?.uid);
  const [showComment, setShowComment] = React.useState(false);

  const [error, setError] = React.useState("");
  const [commentText, setCommentText] = React.useState("");
  const {
    author,
    content,
    comments,
    id,
    image,
    likes,
    timestamp,
    user_id,
    username,
  } = post;
  const { photoURL, Username } = useUserInfo(user_id);
  const memoizedValue = React.useMemo(() => {
    //@ts-ignore
    return likes?.includes(auth.currentUser?.uid);
  }, [likes]);

  async function likePost(postId) {
    const postRef = { ...post };
    delete postRef.id;
    memoizedValue
      ? //@ts-ignore
        postRef?.likes?.splice(likes?.indexOf(auth.currentUser?.uid), 1)
      : postRef?.likes?.push(auth?.currentUser?.uid!); //check apakah kita sudah ngelike postingan, jika sudah maka akan di unlike
    const docref = doc(db, "posts", postId);
    await updateDoc(docref, postRef).then(() => {
      // alert("comment added");
      setError("");
      setCommentText("");
    });
  }
  async function addComment(postId) {
    if (!commentText) return setError("the input is empty");
    const postRef = { ...post };
    delete postRef.id;
    const comment = {
      ...postRef,
      comments: [
        //@ts-ignore
        ...postRef.comments,
        {
          id: crypto.randomUUID(),
          post_id: id,
          user_id: auth.currentUser?.uid,
          comment_text: commentText,
          created_at: Date.now(),
          updated_at: Date.now(),
          author: auth.currentUser?.displayName || auth.currentUser?.email,
          image: auth.currentUser?.photoURL,
        },
      ],
    };
    const docref = doc(db, "posts", postId);
    await updateDoc(docref, comment).then(() => {
      // alert("comment added");
      setError("");
      setCommentText("");
    });
  }
  // console.log(auth.currentUser?.photoURL);

  return (
    <div
      key={id}
      className="posts-container my-5 p-3 shadow-lg rounded-md border-[1px] bg-white"
    >
      <nav className="flex justify-between items-center">
        <Link
          to={`/user/${user_id}`}
          className="profilePhoto max-h-11 overflow-hidden max-w-11 mr-2 rounded-full border-blue-400 border-[2px]"
        >
          {photoURL ? (
            <img
              //@ts-ignore
              src={photoURL && photoURL}
              //@ts-ignore
              alt={Username}
              className="h-9 w-9 rounded-full"
            />
          ) : (
            <div className="bg-gray-300 w-full h-full"></div>
          )}
        </Link>
        <Link to={`/user/${user_id}`} className="profile-info mr-auto">
          <p className="text-sm font-semibold capitalize">
            {Username || author}
          </p>
          <p className="text-xs text-gray-400 font-semibold capitalize">
            {convertUnixTimestamp(timestamp)}
          </p>
        </Link>
        <BiDotsVerticalRounded size={25} />
      </nav>
      <div className="content my-2">
        <p className="text mb-2 text-sm text-gray-600 ">{content}</p>
        <div className="img w-full max-h-56 overflow-hidden  rounded-md">
          {image && (
            <a href={image} target="_blank">
              <img
                src={image}
                alt={id}
                className="w-full object-cover h-full "
              />
            </a>
          )}
        </div>
        <div className="ctas border-y-2 text-gray-500 py-2 mt-2 [&>*]:flex  [&>*]:gap-2 [&>*]:items-center  flex justify-between ">
          <label
            onClick={() => setShowComment((pre) => !pre)}
            htmlFor={`comments${id}`}
            className="btn cursor-pointer"
          >
            <GoComment />
            <span className="block">{comments?.length} comments</span>
          </label>
          <button
            onClick={() => likePost(id)}
            className={`btn ${memoizedValue && "text-red-400"}`}
          >
            <AiOutlineHeart />
            <span className={`block `}>
              {likes?.length! > 0 && `${likes?.length} likes`}
            </span>
          </button>
        </div>
        <p className="text-red-300 text-xs">{error && error}</p>
        <ul
          className={`divide-y-[1px]  overflow-hidden duration-300 transition-heights ${
            showComment ? "h-auto" : "h-0"
          }  `}
        >
          {comments?.map((comment) => {
            return (
              <li key={comment.id}>
                <div className="comment leading-3  items-center my-2 flex gap-2">
                  {comment.image ? (
                    <Link to={`/user/${comment.user_id}`}>
                      <img
                        src={comment.image}
                        alt={comment.author}
                        className="w-8 h-8 rounded-full "
                      />
                    </Link>
                  ) : (
                    <div className="w-6 h-8 rounded-full bg-gray-400 "></div>
                  )}
                  <div className="content">
                    <p className="profileName text-sm text-blue-300 font-medium">
                      <Link to={`/user/${comment.user_id}`}>
                        {username || comment?.author.split("@")[0]}
                      </Link>
                    </p>
                    <p className="profileName text-sm font-sm text-gray-500">
                      {comment.comment_text}
                    </p>
                    <span className="text-[12px] text-gray-400">
                      {convertUnixTimestamp(comment.created_at)}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="comments flex gap-2 items-center">
          {auth.currentUser?.photoURL ? (
            <img
              src={auth.currentUser?.photoURL}
              className="w-10 border-2 overflow-auto  h-8   rounded-full"
            />
          ) : (
            <div className="profile bg-gray-300 w-11 overflow-auto max-h-10  h-11 p-2  rounded-full"></div>
          )}
          <input
            onChange={(e) => setCommentText(e.target.value)}
            value={commentText}
            placeholder="write your comment"
            type="text"
            className="w-full p-2 rounded-md my-2 shadow-inner bg-gray-100 outline-blue-300"
            id={`comments${id}`}
            name="comments"
          />
          <button
            type="submit"
            onClick={() => addComment(id)}
            className="bg-blue-400 rounded-md text-white duration-300 hover:bg-gray-300 border-blue-300 h-10 p-2"
          >
            kirim
          </button>
        </div>
      </div>
    </div>
  );
};

export default post;
