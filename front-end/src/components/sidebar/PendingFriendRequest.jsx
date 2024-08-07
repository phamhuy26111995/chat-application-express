import { useSocketContext } from "../../context/SocketContext";
import useResponseFriendReq from "../../hooks/useResponseFriendReq";
import useConversation from "../../zustand/useConversation";
import useFriendRequest from "../../zustand/useFriendRequest";

const PendingFriendRequest = ({ friendRequest, lastIdx, emoji }) => {
	const { selectedFriendRequest, setSelectedFriendRequest } = useFriendRequest();
    const {loading, responseFriendRequest} = useResponseFriendReq();


	const isSelected = selectedFriendRequest?._id === friendRequest._id;


    
	return (
		<>
			<div
				className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
				onClick={() => setSelectedFriendRequest(friendRequest)}
			>
				<div className={`avatar`}>
					<div className='w-12 rounded-full'>
						<img src={friendRequest.requester.profilePicture} alt='user avatar' />
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{friendRequest.requester.fullName}</p>
						<span className='text-xl'>{emoji}</span>
					</div>
                    <div>
                        {friendRequest.status}
                        <button onClick={() => responseFriendRequest(friendRequest._id,"accepted")}>Accepted</button>
                        <button onClick={() => responseFriendRequest(friendRequest._id,"declined")}>Declined</button>
                    </div>
                    
				</div>
			</div>

			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};
export default PendingFriendRequest;
