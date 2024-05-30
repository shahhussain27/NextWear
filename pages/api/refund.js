import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { paymentId, amount } = req.body;

  if (!paymentId || !amount) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const refund = await razorpay.payments.refund(paymentId, {
      amount: amount * 100,
    });

    res.status(200).json(refund);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
