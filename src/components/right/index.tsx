import { doc, getDocs } from "firebase/firestore";
import React from "react";
import { Link } from "react-router-dom";
import { db, usersCollection } from "../../api/firebase";
import { Users } from "../../api/types/postType";

const Right = () => {
  const [conversationList, setConversationList] = React.useState([] as Users[]);
  async function getAllUser() {
    const users = await getDocs(usersCollection).then((data) => {
      return data.docs.map((user) => {
        return { ...user.data() };
      });
    });
    //@ts-ignore
    setConversationList(users);
  }

  React.useEffect(() => {
    // effect code
    getAllUser();

    return () => {
      // cleanup code
    };
  }, []);
  console.log(conversationList);

  return (
    <div className="p-5">
      <div className="advertisement">
        <header className="flex text-gray-600 items-center my-3 justify-between">
          <p className="">
            <span>Advertisement</span>
          </p>
          <span className="block text-sm text-blue-400">close</span>
        </header>
        <img
          src="https://img.freepik.com/free-photo/group-diverse-people-having-business-meeting_53876-25060.jpg?w=900&t=st=1677668588~exp=1677669188~hmac=10a3a997293a46729fb7aeaed30ff2888c4a5db6a47ca8cf2cbd9c3d4e1235d7"
          alt=""
          className="rounded-md"
        />
      </div>
      <div className="conversation text-gray-600">
        <header className="my-3 flex justify-between items-center">
          <span>Conversation</span>
          <span className="text-blue-400 text-sm ">Hide Chat</span>
        </header>
        <ul className="space-y-3 divide-y-2">
          {conversationList?.map((user) => {
            return (
              <li className="flex justify-between relative items-center">
                <Link
                  className="flex items-center"
                  to={`/user/${user.User_ID}`}
                >
                  <span className="absolute  bottom-0 left-8 z-[9] border-2 h-3 w-3 bg-green-400 rounded-full"></span>
                  <div className="profilePhoto relative max-h-11 overflow-hidden max-w-11 mr-2 rounded-full border-blue-400 border-[2px]">
                    <img
                      //@ts-ignore
                      src={user?.photoURL}
                      //@ts-ignore
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  </div>
                  <div className="profile-info mr-auto">
                    <p className="text-sm text-gray-600 capitalize">
                      {user.Username || user?.Email.split("@")[0]}
                    </p>
                    <p className="text-xs text-gray-400 font-semibold capitalize"></p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Right;
