const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("User", UserSchema);
