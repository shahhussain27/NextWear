import Products from "@/models/Products";
import connectDB from "@/middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      // console.log(req.body.length)
      for (let i = 0; i < req.body.length; i++) {
        let p = new Products({
          title: req.body[i].title,
          slug: req.body[i].slug,
          desc: req.body[i].desc,
          img: req.body[i].img,
          category: req.body[i].category,
          size: req.body[i].size,
          color: req.body[i].color,
          price: req.body[i].price,
          availableQty: req.body[i].availableQty,
        });
        console.log(p)
        await p.save();
      }
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDB(handler);
