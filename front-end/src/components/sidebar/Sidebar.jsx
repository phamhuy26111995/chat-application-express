import { useState } from "react";
import Conversations from "./Conversations";
import FriendRequests from "./FriendRequests";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
	const [isShowFriendRequests, setIsShowFriendRequests] = useState(false);

	
	return (
		<div className='border-r border-slate-500 p-4 flex flex-col'>
			<button onClick={() => setIsShowFriendRequests(true)}>Show Friend Request</button>
			<SearchInput />
			<div className='divider px-3'></div>
			{
				isShowFriendRequests ? (
					<FriendRequests />
				) : (
					<Conversations />
				)
			}
			<LogoutButton />
		</div>
	);
};
export default Sidebar;

