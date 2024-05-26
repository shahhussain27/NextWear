const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    email: { type: String, require: true },
    orderId: { type: String, require: true },
    paymentInfo: { type: String, default: "" },
    products: { type: Object, require: true },
    address: { type: String, require: true },
    amount: { type: Number, require: true },
    status: { type: String, default: "Pending", require: true },
    devliveryStatus: { type: String, default: "unshipped", require: true },
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("Order", OrderSchema);
