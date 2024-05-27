import pincode from "../../pincodes.json";

export default function handler(req, res) {
  let pincodes = pincode;
  res.status(200).json(pincodes);
}
