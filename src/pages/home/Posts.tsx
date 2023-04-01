import React from "react";
import Post from "./post";
import { onSnapshot } from "firebase/firestore";
import { postsCollection } from "../../api/firebase";
import { PostInterface } from "../../api/types/postType";
import PostSkeleton from "../../ui/skeleton";

const Posts = () => {
  const [loading, setLoading] = React.useState(true);

  const [posts, setPosts] = React.useState<PostInterface[]>([]);

  React.useEffect(() => {
    const unsubscribe = onSnapshot(postsCollection, async (data) => {
      const result = await data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(result);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className="post-container">
      {loading && (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      )}
      {posts?.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </div>
  );
};

export default Posts;
