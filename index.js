const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
//     methods: ['GET', 'POST', 'PUT', 'DELETE']
app.use(express.json());


const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.vxkokou.mongodb.net/?retryWrites=true&w=majority`;
const users = [
  { name: "alamgir", email: "alamgir@mail.com" },
  { name: "kabirr", email: "kabirr@mail.com" },
  { name: "khalek", email: "khalek@mail.com" },
];
app.get("/", (req, res) => {
  res.send("Toy market is running");
});


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


app.get('/users', (req, res)=>
{
    res.send(users)
});

app.listen(port, () => {
  console.log(`Server Running at PORT: ${port}`);
});
