import User from "../model/user.model.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

export async function login(req, res) {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    const isPasswordValid = await bcrypt.compare(password, user.password || "");

    if (!user || !isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      userName: user.userName,
      fullName: user.fullName,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    console.log("Error in login condtroller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function register(req, res) {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password does not match" });
    }

    const user = await User.findOne({ userName });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profilePicture:
        "https://res.cloudinary.com/dgmmn28ih/image/upload/v1686455647/HinhTest.jpg",
    });

    await newUser.save();
    generateToken(newUser._id, res);

    res
      .status(201)
      .json({
        _id: newUser._id,
        userName: newUser.userName,
        fullName: newUser.fullName,
        profilePicture: newUser.profilePicture,
      });
  } catch (error) {
    console.log("Error in register condtroller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

export function logout(req, res) {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {}
}
