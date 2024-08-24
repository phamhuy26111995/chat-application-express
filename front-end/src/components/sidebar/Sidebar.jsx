import { useState } from "react";
import Conversations from "./Conversations";
import FriendRequests from "./FriendRequests";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import Modal from "../modal/Modal";
import useModal from "../../zustand/useModal";
import AllConversation from "../modal/AllConversations";

const Sidebar = () => {
  const [isShowFriendRequests, setIsShowFriendRequests] = useState(false);
  const { isOpenModal, setIsOpenModal, setModalContent } = useModal();

  function handleFindFriend() {
    setIsOpenModal(true);
    setModalContent({
      title: "Kết bạn",
      content: <AllConversation />,
    });
  }

  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <div className="flex gap-5 mb-5 justify-center">
        <button
          className="btn btn-primary min-h-0 h-8 text-sm py-0"
          onClick={handleFindFriend}
        >
          Kết bạn
        </button>
        <button
          className="btn btn-accent min-h-0 h-8 text-sm py-0"
          onClick={() => setIsShowFriendRequests(true)}
        >
          Yêu cầu kết bạn
        </button>
      </div>
      <div className="mb-4 flex justify-center">
        <button
          className="btn btn-accent min-h-0 h-8 text-sm py-0"
          onClick={() => setIsShowFriendRequests(false)}
        >
          Danh sách bạn bè
        </button>
      </div>

      <SearchInput />
      <div className="divider px-3"></div>
      {isShowFriendRequests ? <FriendRequests /> : <Conversations />}
      <LogoutButton />
    </div>
  );
};
export default Sidebar;
