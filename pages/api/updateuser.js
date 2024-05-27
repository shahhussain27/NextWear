import User from "@/models/User";
import connectDB from "@/middleware/mongoose";
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      let token = req.body.token;
      let user = jwt.verify(token, process.env.JWT_SECRET);
      const dbuser = await User.findOneAndUpdate(
        { email: user.email },
        {
          username: req.body.name,
          phone: req.body.phone,
          address: req.body.address,
          pincode: req.body.pincode,
        }
      );

      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
  }
};

export default connectDB(handler);
