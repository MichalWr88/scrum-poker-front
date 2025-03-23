// For example, in an API route:
import type { NextApiRequest, NextApiResponse } from "next";
import { initConnectMongo } from "@/src/services/mongodb/service";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await initConnectMongo();
    // Now you can use your models
    res.status(200).json({ message: "Connected to Mongo!" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error connecting to Mongo:", error);
    }
    res.status(500).json({ error: "Error connecting to Mongo" });
  }
}
