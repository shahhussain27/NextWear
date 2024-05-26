import Order from "@/models/Order";
import connectDB from "@/middleware/mongoose";
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  const token = req.body.token;
  const data = jwt.verify(token, process.env.JWT_SECRET)
  let orders = await Order.find({ email: data.email });
  res.status(200).json({ orders: orders });
};

export default connectDB(handler);
