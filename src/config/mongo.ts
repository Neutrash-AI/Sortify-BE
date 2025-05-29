import { MongoClient } from "mongodb";
import "dotenv/config";

const uri: string = process.env.MONGODB_URI || "";
let cachedClient: MongoClient | null = null;

export async function connectToDatabase() {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}
