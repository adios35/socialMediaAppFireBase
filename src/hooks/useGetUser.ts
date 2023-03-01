import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { getDoc, doc, where } from "firebase/firestore";
import { UserInfo } from "firebase/auth";
import { db } from "../api/firebase";
interface user {
  Email: string;
  User_ID: string;
  Username: string;
  photoURL: string;
}
const useUserInfo = (userId) => {
  const [userInfo, setUserInfo] = useState({} as user);

  useEffect(() => {
    const getUserInfo = async () => {
      const userColl = doc(db, "users", userId);
      const userData = await getDoc(userColl);
      //@ts-ignore
      setUserInfo(userData.data());
    };

    if (userId) {
      getUserInfo();
    }
  }, [userId]);

  return userInfo;
};

export default useUserInfo;
