import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://medicocaresupport_db_user:MedicoCare2026@ac-wecy9wz-shard-00-00.6ks1959.mongodb.net:27017,ac-wecy9wz-shard-00-01.6ks1959.mongodb.net:27017,ac-wecy9wz-shard-00-02.6ks1959.mongodb.net:27017/medico_care?ssl=true&replicaSet=atlas-pio6c2-shard-0&authSource=admin";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
