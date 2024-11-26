import mongoose, { Document, Schema } from "mongoose";
import { modelTypes, customerStatus, connectionType } from "./common";
import { autoIncrement } from "mongoose-plugin-autoinc";

interface ICustomer extends Document {
  // _id: number;
  status: string;
  joinDate: Date;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  boxNo?: string;
  connectionType: string;
  location?: Object;
  address?: string;
  package?: string | null;
}

const CustomerSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  boxNo: {
    type: String,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  package: {
    type: mongoose.Schema.Types.String,
    ref: modelTypes.PACKAGE,
  },
  address: {
    type: String,
  },
  connectionType: {
    type: String,
    enum: [connectionType.INTERNET, connectionType.CABLE, connectionType.BOTH],
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
  joinDate: {
    type: Date,
    default: Date.now(),
  },
});
CustomerSchema.plugin(autoIncrement, {
  model: modelTypes.CUSTOMER,
  startAt: 1,
});

export default mongoose.models.Customer ||
  mongoose.model("Customer", CustomerSchema);
