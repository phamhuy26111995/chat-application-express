import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "../sidebar/Conversation";
import NonFriend from "./NonFriend";

const NonFriendList = () => {
  const {
    loading,
    conversations: nonFriendConversations,
    setTriggerSearch,
  } = useGetConversations(true);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {nonFriendConversations.map((conversation, idx) => (
        <NonFriend
          setTriggerSearch={setTriggerSearch}
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === nonFriendConversations.length - 1}
        />
      ))}

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};
export default NonFriendList;
