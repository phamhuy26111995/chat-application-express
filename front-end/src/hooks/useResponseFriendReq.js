import React, { useState } from "react";
import toast from "react-hot-toast";

function useResponseFriendReq() {
  const [loading, setLoading] = useState(false);

  async function responseFriendRequest(requestId, response) {
    setLoading(true);

    try {
      const res = await fetch("/api/users/response-friend-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestId, response }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("Response is send");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return { loading, responseFriendRequest };
}

export default useResponseFriendReq;
