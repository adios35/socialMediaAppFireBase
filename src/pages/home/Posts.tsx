import React from "react";
import Post from "./post";
import { GoComment } from "react-icons/go";
import { AiOutlineHeart } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { getDoc, DocumentData, getDocs, onSnapshot } from "firebase/firestore";
import { db, postsCollection } from "../../api/firebase";
import { PostInterface } from "../../api/types/post";

const Posts = () => {
  const [posts, setPosts] = React.useState<PostInterface[]>([]);

  React.useEffect(() => {
    const unsubscribe = onSnapshot(postsCollection, async (data) => {
      const result = await data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(result);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  // console.log(posts);

  return (
    <div className="post-container">
      {posts?.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </div>
  );
};

export default Posts;
