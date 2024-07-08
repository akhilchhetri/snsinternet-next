import mongoose from "mongoose";
import { customerStatus } from "./common";
const PackageSchema = new mongoose.Schema({
  desc: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: [
      customerStatus.ACTIVE,
      customerStatus.DEACTIVE,
      customerStatus.SUSPENDED,
    ],
    default: customerStatus.ACTIVE,
  },
  price: {
    type: Number,
    required: true,
  },
  speed: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});


export default mongoose.models.Package || mongoose.model("Package", PackageSchema);
