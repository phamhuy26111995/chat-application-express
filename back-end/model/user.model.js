import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },

    profilePicture: {
      type: String,
      default: "",
    },
    friends: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
    friendRequests: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "FriendRequest",
    }],
  },
  { timestamps: true }
);

// Phương thức static để hủy kết bạn
userSchema.statics.unfriend = async function(userId1, userId2) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user1 = await this.findById(userId1).session(session);
    const user2 = await this.findById(userId2).session(session);

    if (!user1 || !user2) {
      throw new Error("One or both users not found");
    }

    // Xóa userId2 khỏi danh sách bạn bè của user1
    user1.friends = user1.friends.filter(friendId => !friendId.equals(userId2));
    await user1.save({ session });

    // Xóa userId1 khỏi danh sách bạn bè của user2
    user2.friends = user2.friends.filter(friendId => !friendId.equals(userId1));
    await user2.save({ session });

    await session.commitTransaction();
    session.endSession();

    return { success: true, message: "Users unfriended successfully" };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const User = mongoose.model("User", userSchema);

export default User;
