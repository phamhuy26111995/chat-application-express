import { useSocketContext } from "../../context/SocketContext";
import useResponseFriendReq from "../../hooks/useResponseFriendReq";
import useConversation from "../../zustand/useConversation";
import useFriendRequest from "../../zustand/useFriendRequest";

const PendingFriendRequest = ({ friendRequest, lastIdx, emoji }) => {
  const { loading, responseFriendRequest } = useResponseFriendReq();

  return (
    <>
      <div
        className={`flex gap-2 items-center  rounded p-2 py-1 cursor-pointer
			`}
      >
        <div className={`avatar`}>
          <div className="w-12 rounded-full">
            <img
              src={friendRequest.requester.profilePicture}
              alt="user avatar"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">
              {friendRequest.requester.fullName}
            </p>
            <span className="text-xl">{emoji}</span>
          </div>
          <div>
            {friendRequest.status}
            <div className="flex gap-3">
              <button
                className="btn btn-primary min-h-0 h-7"
                onClick={() =>
                  responseFriendRequest(friendRequest._id, "accepted")
                }
              >
                Chấp nhận
              </button>
              <button
                className="btn btn-accent min-h-0 h-7"
                onClick={() =>
                  responseFriendRequest(friendRequest._id, "declined")
                }
              >
                Từ chối
              </button>
            </div>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};
export default PendingFriendRequest;
