import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = (isFindAll) => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);
	const [triggerSearch , setTriggerSearch] = useState(false);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const res = await fetch(`${isFindAll ? "/api/users/get-non-friends" : "/api/users/get-friends"}`);
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}
				setConversations(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, [triggerSearch]);

	return { loading, conversations ,setTriggerSearch };
};
export default useGetConversations;