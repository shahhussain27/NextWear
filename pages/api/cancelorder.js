import Order from "@/models/Order";
import Products from "@/models/Products";
import connectDB from "@/middleware/mongoose";

const handler = async (req, res) => {
  try {
    let order = await Order.findById(req.body.id);
    if (!order) {
      return res.status(404).send({ status: "fail", msg: "Not Found" });
    }

    order = await Order.findByIdAndUpdate(req.body.id, { status: "Cancel" });

    let products = order.products;
    for (let slug in products) {
      await Products.findOneAndUpdate(
        { slug: slug },
        {
          $inc: { availableQty: products[slug].qty },
        }
      );
    }
    res.status(200).json({ status: "success", msg: "Order Cancel Successful" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

export default connectDB(handler);
