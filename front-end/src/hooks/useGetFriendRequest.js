import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGetFriendRequest = () => {
  const [loading, setLoading] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const { authUser } = useAuthContext();
  useEffect(() => {
    const getfriendRequest = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users/get-friend-requests", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        });
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setFriendRequests(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (authUser) {
      getfriendRequest();
    }
  }, [authUser]);

  return { loading, friendRequests };
};

export default useGetFriendRequest;
