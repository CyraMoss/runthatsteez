import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://cyramoss:dKcZNdWnMr60Dk0i@cluster0.w4touyd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your MongoDB connection string
const client = new MongoClient(uri);

async function connect() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    throw err;
  }
  return client.db('your_db_name'); // Replace with your database name
}

export default connect;
