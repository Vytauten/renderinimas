import User from "../models/userModelA.js";
import jwt from "jsonwebtoken";

// login user geras
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email: user.email, role: user.role, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// jwt creation
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// signup user
export const signupUser = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email: user.email, role: user.role, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
