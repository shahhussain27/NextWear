import Cors from 'cors';
import initMiddleware from '@/middleware/init-middleware';
import Products from '@/models/Products';
import connectDB from '@/middleware/mongoose';

// Initialize the CORS middleware
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
    origin: '*', // Adjust the origin as needed for your use case
  })
);

const handler = async (req, res) => {
  // Run the CORS middleware
  await cors(req, res);

  try {
    let products = await Products.find({ category: "tshirt" });
    let tshirts = {};
    for (let item of products) {
      if (item.title in tshirts) {
        if (
          !tshirts[item.title].color.includes(item.color) &&
          item.availableQty > 0
        ) {
          tshirts[item.title].color.push(item.color);
        }
        if (
          !tshirts[item.title].size.includes(item.size) &&
          item.availableQty > 0
        ) {
          tshirts[item.title].size.push(item.size);
        }
      } else {
        tshirts[item.title] = JSON.parse(JSON.stringify(item));
        if (item.availableQty > 0) {
          tshirts[item.title].color = [item.color];
          tshirts[item.title].size = [item.size];
        }
      }
    }

    res.status(200).json({ tshirts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export default connectDB(handler);
