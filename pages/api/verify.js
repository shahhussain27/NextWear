import crypto from "crypto";
import Order from "@/models/Order";
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

    // console.log(orderCreationId)

    const signature = generatedSignature(orderCreationId, razorpayPaymentId);

    if (signature !== razorpaySignature) {
      let order = await Order.findOneAndUpdate(
        { orderId: orderCreationId },
        { status: "Fail", paymentInfo: orderCreationId }
      );
      res
        .status(400)
        .json({ message: "payment verification failed", isOk: false });
    }
    let order = await Order.findOneAndUpdate(
      { orderId: orderCreationId },
      { status: "Paid", paymentInfo: JSON.stringify(req.body) }
    );
    // console.log(order)
    res
      .status(200)
      .json({ message: "payment verified successfully", isOk: true });
  }
};

export default connectDB(handler);
