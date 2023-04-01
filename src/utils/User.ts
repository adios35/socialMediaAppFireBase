import { doc, getDoc } from "firebase/firestore";
import { db } from "../api/firebase";

interface user {
  Username: string;
  Email: string;
  User_ID;
  photoURL: string;
  followers: string[];
  following: string[];
}

export async function getUserDataFn(id) {
  // console.log(userPosts);
  const userColl = await doc(db, "users", id);
  const data = await getDoc(userColl)
    .then((user) => {
      //@ts-ignore
      return user.data();
    })
    .catch((err) => console.log(err.message));
  return data;
}
