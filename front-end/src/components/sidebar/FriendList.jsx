import React from "react";
import { useAuthContext } from "../../context/AuthContext";

function FriendList() {
  const { authUser } = useAuthContext();
  return (
    <>
        {authUser.friend.map((friend) => (
            <div>hello world</div>
        ))}
    </>
  )
}

export default FriendList;
