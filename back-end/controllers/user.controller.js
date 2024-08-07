import FriendRequest from "../model/friendRequest.model.js";
import User from "../model/user.model.js";

export async function getUsersForSideBar(req, res) {
  try {
    const loggedInUserId = req.user._id;

    const users = await User.find(
      { _id: { $ne: loggedInUserId } },
      { password: 0 }
    );

    res.status(200).json(users);
  } catch (error) {
    console.log("Error in getting users", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function sendFriendRequest(req, res) {
  try {
    const { recipientId } = req.body;

    if (req.user.friends.includes(recipientId)) {
      return res.status(400).json({ error: "User is already a friend" });
    }

    const newRequest = new FriendRequest({
      requester: req.user._id,
      recipient: recipientId,
    });

    await newRequest.save();

    await User.findByIdAndUpdate(recipientId, {
      $push: { friendRequests: newRequest._id },
    });
    res.status(201).json({ message: "Friend request sent" });
  } catch (error) {
    console.log("Error in sending friend request", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function responseFriendRequest(req, res) {
  try {
    const { requestId, response } = req.body;

    const request = await FriendRequest.findById(requestId);

    if (!request) {
      throw new Error("Request not found");
    }

    request.status = response;
    await request.save();

    if (response === "declined" || response === "pending") {
      res.status(200).json({ message: `Friend request ${response}` });
      return;
    }

    const { requester, recipient } = request;

    await User.findByIdAndUpdate(requester, {
      $push: { friends: recipient },
      $pull: { friendRequests: requestId },
    });

    await User.findByIdAndUpdate(recipient, {
      $push: { friends: requester },
      $pull: { friendRequests: requestId },
    });
    res.status(200).json({ message: "Friend request accepted" });
    console.log("Friend request accepted");
  } catch (error) {
    console.log("Error in accepting friend request", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getFriendRequests(req, res) {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "friendRequests",
      match: { status: "pending" },
      populate: {
        path: "requester recipient",
        select: "fullName username profilePicture",
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    res.status(200).json(user.friendRequests);
  } catch (error) {
    console.error("Error getting friend requests:", error);
    throw error;
  }
}

export async function getFriends(req, res) {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'friends',
      select: 'fullName username profilePicture'
    });

    if (!user) {
      throw new Error("User not found");
    }

    res.status(200).json(user.friends);
    
  } catch (error) {
    console.error("Error getting friends list:", error);
    res.status(500).json({ error: "Internal server error" });
    throw error;
  }
}

export async function getNonFriends(req, res) {
  try {
    // Get the current user's friends list
    const currentUser = await User.findById(req.user._id).populate('friends');

    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const friendIds = currentUser.friends.map(friend => friend._id);

    // Find all users who are not in the current user's friends list
    const nonFriends = await User.find({ 
      _id: { $nin: friendIds, $ne: req.user._id }
    }).select('-password'); // Exclude password field from the result

    res.status(200).json(nonFriends);
  } catch (error) {
    console.log("Error getting non-friends:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}