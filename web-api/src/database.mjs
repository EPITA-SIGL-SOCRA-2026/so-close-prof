import { MongoClient, ServerApiVersion } from "mongodb";

// Replace the placeholder with your Atlas connection string
const uri = "mongodb://root:example@127.0.0.1:27017/?authSource=admin";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
export async function getTasks() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    const session = await client.connect();
    // Send a ping to confirm a successful connection
    const database = session.db("so-close");
    const tasks = database.collection("tasks");
    return await tasks.find({}).toArray();
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
