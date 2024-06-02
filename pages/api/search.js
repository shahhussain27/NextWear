import Products from "@/models/Products";
import connectDB from "@/middleware/mongoose";

const handler = async (req, res) => {
  try {
    const { query } = req.query;

    const products = await Products.find({
      $or: [{ title: { $regex: `${query}`, $options: "i" } }],
    });

    const product = {};

    for (let item of products) {
      if (item.title in product) {
        if (
          !product[item.title].color.includes(item.color) &&
          item.availableQty > 0
        ) {
          product[item.title].color.push(item.color);
          // console.log(product);
        }
        if (
          !product[item.title].size.includes(item.size) &&
          item.availableQty > 0
        ) {
          product[item.title].size.push(item.size);
        }
      } else {
        product[item.title] = JSON.parse(JSON.stringify(item));
        if (item.availableQty > 0) {
          product[item.title].color = [item.color];
          product[item.title].size = [item.size];
        } else {
          product[item.title].color = [];
          product[item.title].size = [];
        }
      }
    }

    res.status(200).send({ results: product });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

export default connectDB(handler);
