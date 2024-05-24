import connectDB from "@/middleware/mongoose";
import User from "@/models/User";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { username, email, password } = req.body;
    let u = new User({
      username,
      email,
      password: CryptoJS.AES.encrypt(password, "admin").toString(),
    });
    await u.save();

    res.status(200).json({ success: "success" });
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDB(handler);
