import { initConnectMongo } from "@/src/services/mongodb/service";

export async function GET() {
  try {
    await initConnectMongo();
    return new Response(JSON.stringify({ message: "Connected to Mongo!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("❌ Error connecting to Mongo:", error);
    return new Response(JSON.stringify({ error: "Error connecting to Mongo" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}