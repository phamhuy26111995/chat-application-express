import { create } from "zustand";

const useFriendRequest = create((set) => ({
	selectedFriendRequest: null,
	setSelectedFriendRequest: (selectedFriendRequest) => set({ selectedFriendRequest }),
}));


export default useFriendRequest;