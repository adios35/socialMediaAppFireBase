import { Timestamp } from "firebase/firestore";

export interface Users {
  Email: string;
  User_ID: string;
  Username: string;
  password: string;
  photoURL: string;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  comment_text: string;
  created_at: Timestamp;
  updated_at: Timestamp;
  author: string;
  image?: string;
}

export interface PostInterface {
  username?: string;
  id?: string;
  user_id?: string;
  author?: string;
  image?: string;
  content?: string;
  timestamp?: Date | number;
  likes?: string[];
  comments?: Comment[];
}
