import User from "@/models/User";
import connectDB from "@/middleware/mongoose";
var jwt = require("jsonwebtoken");
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      let token = req.body.token;
      let user = jwt.verify(token, process.env.JWT_SECRET);
      let dbuser = await User.findOne({ email: user.email });
      const bytes = CryptoJS.AES.decrypt(
        dbuser.password,
        process.env.JWT_SECRET
      );
      let decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
      if (
        decryptedPassword == req.body.password &&
        req.body.npassword == req.body.cpassword
      ) {
        let dbuser = await User.findOneAndUpdate(
          { email: user.email },
          {
            password: CryptoJS.AES.encrypt(
              req.body.npassword,
              process.env.JWT_SECRET
            ).toString(),
          }
        );
        res.status(200).json({ success: true });
      }

      res.status(400).json({ success: false });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
  }
};

export default connectDB(handler);
