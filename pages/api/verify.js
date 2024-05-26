import crypto from "crypto";
import Order from "@/models/Order";
import Products from "@/models/Products";
import connectDB from "@/middleware/mongoose";

const generatedSignature = (razorpayOrderId, razorpayPaymentId) => {
  const keySecret = process.env.KEY_SECRET;
  if (!keySecret) {
    throw new Error(
      "Razorpay key secret is not defined in environment variables."
    );
  }
  const sig = crypto
    .createHmac("sha256", keySecret)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");
  return sig;
};

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { orderCreationId, razorpayPaymentId, razorpaySignature } = req.body;

    let order;

    const signature = generatedSignature(orderCreationId, razorpayPaymentId);

    if (signature !== razorpaySignature) {
      order = await Order.findOneAndUpdate(
        { orderId: orderCreationId },
        { status: "Fail", paymentInfo: orderCreationId }
      );
      res
        .status(400)
        .json({ message: "payment verification failed", isOk: false });
    }
    order = await Order.findOneAndUpdate(
      { orderId: orderCreationId },
      { status: "Paid", paymentInfo: JSON.stringify(req.body) }
    );

    let products = order.products;
    for (let slug in products) {
      await Products.findOneAndUpdate(
        { slug: slug },
        { $inc: { availableQty: - products[slug].qty } }
      );
    }
    res
      .status(200)
      .json({ message: "payment verified successfully", isOk: true });
  }
};

export default connectDB(handler);
