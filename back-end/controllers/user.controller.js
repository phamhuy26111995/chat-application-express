import User from "../model/user.model.js";

export async function getUsersForSideBar(req, res) {
  try {

    const loggedInUserId = req.user._id;

    const users = await User.find({ _id: { $ne: loggedInUserId } }, { password: 0 });

    res.status(200).json(users);
  } catch (error) {
    console.log("Error in getting users", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}