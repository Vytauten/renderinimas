import jwt from "jsonwebtoken";
import User from "../models/userModelA.js";

const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Reikalingas prisijungimas" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // console.log("Auth header:", authHeader);
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findById(_id).select("_id role");
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Neturite prieigos" });
  }
};

export default requireAuth;
