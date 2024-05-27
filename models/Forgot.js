const mongoose = require("mongoose");
const { Schema } = mongoose;

const ForgotSchema = new Schema(
  {
    userId: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    token: { type: String, default: "" },
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("Forgot", ForgotSchema);
