import connectDB from "@/middleware/mongoose";
import User from "@/models/User";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        const bytes = CryptoJS.AES.decrypt(
          user.password,
          process.env.JWT_SECRET
        );
        let decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

        if (req.body.password === decryptedPassword) {
          var token = jwt.sign(
            {
              success: "true",
              email: user.email,
              username: user.username,
            },
            process.env.JWT_SECRET
          );
          // console.log({token})
          res.status(200).json({ token: token, user: user });
        } else {
          res
            .status(401)
            .json({ success: "false", error: "Invalid Credentials" });
        }
      } else {
        res.status(400).json({ success: "false", error: "User Not Found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ success: "false", error: "Internal Server Error" });
    }
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDB(handler);
