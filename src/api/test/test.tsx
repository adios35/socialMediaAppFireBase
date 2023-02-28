import { collection, getDocs, getDoc } from "firebase/firestore";
import React from "react";
import { postsCollection } from "../firebase";
import { useAuth } from "../../context/registerContext";

interface posts {
  content?: string;
  created_at?: Date;
  id?: string;
  image_url?: string;
  post_id?: string;
  updated_at?: Date;
  user_id?: string;
}
interface userpost {}
const Test = () => {
  const { user } = useAuth();
  const [collections, setCollections] = React.useState([] as posts[] | null);
  const [serPost, setUserPost] = React.useState();

  async function getData() {
    await getDocs(postsCollection).then((result) => {
      const data = result.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setCollections(data);
    });
  }
  console.log(user);

  // function addPost();
  return (
    <div className="grid place-items-center">
      <button onClick={getData} className="text-red-500">
        get data
      </button>
      <div className="posts p-3 rounded-md shadow-md">
        <ul className="post">
          {collections?.map((post) => (
            <li key={post?.id}>
              <span>{post?.content}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Test;
