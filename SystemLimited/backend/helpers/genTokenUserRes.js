import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/config.js";

const genrateUserTokenAndUser = (user, req, res, message) => {
  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    SECRET_KEY,
    { expiresIn: "2d" }
  );

  return res.json({
    message,
    user: {
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
    },
    token, // <- must be here
  });
};

export default genrateUserTokenAndUser;