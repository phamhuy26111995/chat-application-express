import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const NonFriend = ({ conversation, lastIdx, emoji, setTriggerSearch }) => {
  const { authUser } = useAuthContext();
  const { socket } = useSocketContext();

  async function sendFriendRequest() {
    const res = await fetch("/api/users/send-friend-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipientId : conversation._id }),
    });

    const data = await res.json();
    setTriggerSearch(prev => !prev);
    if (data.error) {
        throw new Error(data.error);
    }
  }

  function sendTestMessage() {
    socket.emit('send friend request', 'Hello, server , send friend request!');
  }


  return (
    <>
      <div className={`flex gap-2 items-center`}>
        <div>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePicture} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200 flex-1">
              {conversation.fullName}
            </p>
            {conversation.friendRequests.find((el) => (el.requester === authUser._id) && el.status === "pending") ? (
              <h1>Đã gửi lời mời</h1>
            ) : (
              <button
                className="btn btn-primary min-h-0 h-8 text-sm py-0"
                onClick={sendFriendRequest}
              >
                Mời bạn
              </button>
            )}

        
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};
export default NonFriend;
