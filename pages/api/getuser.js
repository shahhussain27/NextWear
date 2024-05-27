import User from "@/models/User";
import connectDB from "@/middleware/mongoose";
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      let token = req.body.token;
      let user = jwt.verify(token, process.env.JWT_SECRET);
      const dbuser = await User.findOne({ email: user.email });
      // console.log(dbuser)
      const { username, email, address, phone, pincode } = dbuser;
      res.status(200).json({ username, email, address, phone, pincode });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
  }
};

export default connectDB(handler);
