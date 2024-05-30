const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: Number, require: true },
    orderId: { type: String, require: true },
    paymentInfo: { type: Object, default: {} },
    products: { type: Object, require: true },
    address: { type: String, require: true },
    state: { type: String, require: true },
    city: { type: String, require: true },
    pincode: { type: String, require: true },
    amount: { type: Number, require: true },
    status: { type: String, default: "Pending", require: true },
    devliveryStatus: { type: String, default: "unshipped", require: true },
    packagingDate: { type: String, default: "none" },
    shippingDate: { type: String, default: "none" },
    deliveredDate: { type: String, default: "none" },
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("Order", OrderSchema);
