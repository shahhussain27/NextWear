import Order from "@/models/Order";
import connectDB from "@/middleware/mongoose";

const handler = async (req, res) => {
  try {
    let order = await Order.findById(req.body.id);
    if (!order) {
      return res.status(404).send({ status: "fail", msg: "Not Found" });
    }
    order = await Order.findByIdAndDelete(req.body.id);
    res.status(200).json({ status: "success", msg: "Order Delete Successful" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

export default connectDB(handler);
