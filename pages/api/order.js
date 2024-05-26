import Razorpay from "razorpay";
import Order from "@/models/Order";
import connectDB from "@/middleware/mongoose";
import Products from "@/models/Products";

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

    let product,
      subTotal = 0;

    if (req.body.amount <= 0) {
      res.status(400).json({ status: false, msg: "0 amount is not valid" });
      return;
    }
    for (let item in req.body.products) {
      subTotal += req.body.products[item].price * req.body.products[item].qty;
      product = await Products.findOne({ slug: item });
      if (product.availableQty < req.body.products[item].qty) {
        res.status(400).json({ status: false, msg: "error" });
      }
      if (product.price != req.body.products[item].price) {
        res.status(400).json({ status: false, msg: "error" });
        return;
      }
    }

    if (subTotal !== amount) {
      res.status(400).json({ status: false, msg: "Invalid Amount" });
      return;
    }

    if (
      req.body.phone.length !== 10 ||
      !Number.isInteger(JSON.parse(req.body.phone))
    ) {
      res.status(400).json({ status: false, msg: "Phone is invalid" });
      return;
    }

    // console.log(req.body.pincode.length-1)

    if (
      req.body.pincode.length - 1 !== 6 ||
      !Number.isInteger(JSON.parse(req.body.pincode))
    ) {
      res.status(400).json({ status: false, msg: "Pincode is invalid" });
      return;
    }

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
    res.status(200).json({ orderId: order.id, order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export default connectDB(handler);
