import jwt from "jsonwebtoken";
const createTokenAndSaveCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
    expiresIn: "10d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,         // ⬅️ Make sure it's false in local dev
    sameSite: "Lax",       // ⬅️ Safer and allows frontend <-> backend communication
    maxAge: 10 * 24 * 60 * 60 * 1000, // Optional: 10 days
  });
};

export default createTokenAndSaveCookie;
