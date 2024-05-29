import Order from "@/models/Order";
import connectDB from "@/middleware/mongoose";
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  const token = req.body.token;
  const data = jwt.verify(token, process.env.JWT_SECRET);
  let orders = await Order.find({ email: data.email });
  let myorders = await Order.find({ status: "Paid" });
  // console.log(myorders);
  res.status(200).json({ orders: orders, myorders: myorders });
};

export default connectDB(handler);
