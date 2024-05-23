const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    title: { type: String, require: true },
    slug: { type: String, require: true, unique: true },
    desc: { type: String, require: true },
    img: { type: String, require: true },
    category: { type: String, require: true },
    size: { type: String, require: true },
    color: { type: String, require: true },
    price: { type: Number, require: true },
    availableQty: { type: Number, require: true },
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("Product", ProductSchema);
