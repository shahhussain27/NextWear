import Products from "@/models/Products";
import connectDB from "@/middleware/mongoose";

const handler = async (req, res) => {
  try {
    let products1 = await Products.find({ category: "tshirt" });
    let products2 = await Products.find({ category: "hoodies" });
    let products3 = await Products.find({ category: "mugs" });
    let products4 = await Products.find({ category: "stickers" });
    let tshirts = {};
    let hoodies = {};
    let mugs = {};
    let stickers = {};
    for (let item of products1) {
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
        } else {
          tshirts[item.title].color = [];
          tshirts[item.title].size = [];
        }
      }
    }
    for (let item of products2) {
      if (item.title in hoodies) {
        if (
          !hoodies[item.title].color.includes(item.color) &&
          item.availableQty > 0
        ) {
          hoodies[item.title].color.push(item.color);
        }
        if (
          !hoodies[item.title].size.includes(item.size) &&
          item.availableQty > 0
        ) {
          hoodies[item.title].size.push(item.size);
        }
      } else {
        hoodies[item.title] = JSON.parse(JSON.stringify(item));
        if (item.availableQty > 0) {
          hoodies[item.title].color = [item.color];
          hoodies[item.title].size = [item.size];
        } else {
          hoodies[item.title].color = [];
          hoodies[item.title].size = [];
        }
      }
    }
    for (let item of products3) {
      if (item.title in mugs) {
        if (
          !mugs[item.title].color.includes(item.color) &&
          item.availableQty > 0
        ) {
          mugs[item.title].color.push(item.color);
        }
        if (
          !mugs[item.title].size.includes(item.size) &&
          item.availableQty > 0
        ) {
          mugs[item.title].size.push(item.size);
        }
      } else {
        mugs[item.title] = JSON.parse(JSON.stringify(item));
        if (item.availableQty > 0) {
          mugs[item.title].color = [item.color];
          mugs[item.title].size = [item.size];
        } else {
          mugs[item.title].color = [];
          mugs[item.title].size = [];
        }
      }
    }
    for (let item of products4) {
      if (item.title in stickers) {
        if (
          !stickers[item.title].color.includes(item.color) &&
          item.availableQty > 0
        ) {
          stickers[item.title].color.push(item.color);
        }
        if (
          !stickers[item.title].size.includes(item.size) &&
          item.availableQty > 0
        ) {
          stickers[item.title].size.push(item.size);
        }
      } else {
        stickers[item.title] = JSON.parse(JSON.stringify(item));
        if (item.availableQty > 0) {
          stickers[item.title].color = [item.color];
          stickers[item.title].size = [item.size];
        } else {
          stickers[item.title].color = [];
          stickers[item.title].size = [];
        }
      }
    }

    // console.log(tshirts)

    res.status(200).json({ tshirts, hoodies, mugs, stickers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export default connectDB(handler);
