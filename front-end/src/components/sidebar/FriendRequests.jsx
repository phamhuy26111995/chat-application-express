import useGetFriendRequest from "../../hooks/useGetFriendRequest";
import { getRandomEmoji } from "../../utils/emojis";
import PendingFriendRequest from "./PendingFriendRequest";
import React from "react";

const FriendRequests = () => {
	const { loading, friendRequests } = useGetFriendRequest();
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{friendRequests.map((friendRequest, idx) => (
				<PendingFriendRequest
					key={friendRequest._id}
					friendRequest={friendRequest}
					emoji={getRandomEmoji()}
					lastIdx={idx === friendRequests.length - 1}
				/>
			))}

			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};
export default FriendRequests;
