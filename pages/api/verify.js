import crypto from "crypto";
import Order from "@/models/Order";
import Products from "@/models/Products";
import connectDB from "@/middleware/mongoose";

// Function to generate the Razorpay signature
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

    try {
      let order = await Order.findOneAndUpdate(
        { orderId: orderCreationId },
        { status: "Pending", paymentInfo: JSON.stringify(req.body) }
      );

      const signature = generatedSignature(orderCreationId, razorpayPaymentId);

      if (signature !== razorpaySignature) {
        order = await Order.findOneAndUpdate(
          { orderId: orderCreationId },
          { status: "Fail", paymentInfo: JSON.stringify(req.body) }
        );
        return res
          .status(400)
          .json({ message: "Payment verification failed", isOk: false });
      }

      order = await Order.findOneAndUpdate(
        { orderId: orderCreationId },
        { status: "Paid", paymentInfo: JSON.stringify(req.body) }
      );

      let products = order.products;
      for (let slug in products) {
        await Products.findOneAndUpdate(
          { slug: slug },
          { $inc: { availableQty: -products[slug].qty } }
        );
      }

      res
        .status(200)
        .json({ message: "Payment verified successfully", isOk: true });
    } catch (error) {
      console.error("Error in payment verification:", error);
      res.status(500).json({ message: "Internal Server Error", isOk: false });
    }
  } else {
    res.status(405).json({ message: "Method not allowed", isOk: false });
  }
};

export default connectDB(handler);
