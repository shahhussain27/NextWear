import Razorpay from "razorpay";
import Order from "@/models/Order";
import connectDB from "@/middleware/mongoose";

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

const handler = async (req, res) => {
  try {
    const { amount, currency } = req.body;
    // console.log(email);

    var options = {
      amount: parseFloat(amount) * 100,
      currency: currency,
      receipt: "rcp1",
    };

    const order = await razorpay.orders.create(options);

    let newOrder = new Order({
      email: req.body.email,
      orderId: order.id,
      address: req.body.address,
      amount: amount,
      products: req.body.products,
    });

    await newOrder.save();
    // console.log(order);
    res.status(200).json({ orderId: order.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export default connectDB(handler);
