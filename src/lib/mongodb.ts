// @ts-nocheck
import mongoose, { ConnectOptions } from "mongoose";

const MONGODB_URI:string = process.env.MONGODB_URI || "";


declare global {
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       })
//       .then((mongoose) => {
//         return mongoose;
//       });
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
 if (!cached.promise) {
//    const opts:ConnectOptions = {
//      useNewUrlParser: true,
//      useUnifiedTopology: true,
//    };

   cached.promise = mongoose
     .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
     .then((mongoose) => {
       return mongoose.connection;
     });
 }
 cached.conn = await cached.promise;
 return cached.conn;
}

export default dbConnect;
