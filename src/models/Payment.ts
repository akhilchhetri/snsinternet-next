import mongoose from "mongoose";
import { autoIncrement } from "mongoose-plugin-autoinc";
import { customerStatus, modelTypes } from "./common";

const PaymentSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  billDate: {
    type: String,
  },
  paymentTitle: {
    type: String,
    required: true,
  },
  remarks: {
    type: String,
    required: true,
  },
  customer: {
    type: Number,
    required: true,
  },
  due: {
    type: Number,
  },
});
PaymentSchema.plugin(autoIncrement, {
  model: modelTypes.PAYMENT,
  startAt: 1,
});


export default mongoose.models.Payment ||
  mongoose.model("Payment", PaymentSchema);
