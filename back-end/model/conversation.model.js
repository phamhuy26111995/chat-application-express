import mongoose from "mongoose";

// Define the conversation schema
const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: [],
          },
    ],
  },
  { timestamps: true }
);

// Create the conversation model
const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
