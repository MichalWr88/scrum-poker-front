/* eslint-disable no-var */
import mongoose, { ConnectOptions, Connection } from "mongoose";
import { checkMongoConnected } from "./mongoHelpers";

declare global {
  var mongooseCache:
    | {
        conn: Connection | null;
        promise: Promise<Connection> | null;
      }
    | undefined;
}

// If the global cache doesn't exist, initialize it.
if (!global.mongooseCache) {
  global.mongooseCache = { conn: null, promise: null };
}

const mongodbOptions: ConnectOptions = {
  // Add your connection options here if needed, for example:
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

export const initConnectMongo = async (): Promise<Connection> => {
  if (checkMongoConnected()) {
    console.log("🔌 Already connected to DB...");
    return mongoose.connection;
  }

  console.log("🔌 Connecting to DB...", global);
  // Return the connection if it is already established.
  if (global.mongooseCache && global.mongooseCache.conn) {
    if (!global.mongooseCache || !global.mongooseCache.conn) {
      throw new Error("Connection not established");
    }
  }

  const { MONGO_USER, MONGO_PASSWORD, MONGO_CLUSTER, MONGO_DB_NAME } =
    process.env;
  if (!MONGO_USER || !MONGO_PASSWORD || !MONGO_CLUSTER || !MONGO_DB_NAME) {
    const errorMessage =
      "MONGO_USER or MONGO_PASSWORD or MONGO_CLUSTER or MONGO_DB_NAME not set";
    console.error("❌ " + errorMessage);
    throw new Error(errorMessage);
  }

  const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/${MONGO_DB_NAME}?retryWrites=true&w=majority`;

  // If there is no pending promise, establish a new connection.
  if (global.mongooseCache && !global.mongooseCache.promise) {
    global.mongooseCache.promise = mongoose
      .connect(connectionString, mongodbOptions)
      .then((mongooseInstance) => mongooseInstance.connection);
  }

  if (global.mongooseCache) {
    global.mongooseCache.conn = await global.mongooseCache.promise;
  }
  if (global.mongooseCache && global.mongooseCache.conn) {
    global.mongooseCache.conn.once("open", () => {
      console.log(`✅ Connected to DB ${MONGO_DB_NAME}`);
    });
    global.mongooseCache.conn.on("error", (err) => {
      console.error("❌ DB Connection error:", err);
    });
  }
  if (global.mongooseCache) {
    if (global.mongooseCache.conn) {
      return global.mongooseCache.conn;
    }
    throw new Error("Connection not established");
  }
  throw new Error("mongooseCache is undefined");
};
