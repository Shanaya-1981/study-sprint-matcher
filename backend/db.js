import { MongoClient } from "mongodb";

let db;

export async function connectDB(mongoURL) {
  try {
    const client = new MongoClient(mongoURL);
    await client.connect();
    db = client.db("studySprintDB");
    console.log("✅ Connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
}

export function getDB() {
  return db;
}
