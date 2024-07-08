import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  roles: { type: [String], required: true },
  displayName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  provider: { type: String, required: true },
  created: { type: Date, default: Date.now },
  notifications: { type: [String], default: [] },
  salt: { type: String, required: true },
});
// UserSchema.methods.comparePassword = async function (candidatePassword:any) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

export default mongoose.models.User || mongoose.model("User", UserSchema);
