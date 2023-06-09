const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
//     methods: ['GET', 'POST', 'PUT', 'DELETE']
app.use(express.json());


const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.vxkokou.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
  }
});

async function run() {
  try {
      client.connect();

      const galleryCollection = client.db('your-toy').collection('gallery');
      // const toyCollection = client.db('toyCar').collection('toys');

  
      // single data reading from db
      app.get('/gallery/:id', async (req, res) => {
          const id = req.params.id;
          const query = { _id: new ObjectId(id) };
          const result = await galleryCollection.findOne(query);
          res.send(result);
      })

      // send data to database
      app.post('/gallery', async (req, res) => {
          const myToy = req.body;
        //   console.log(myToy);
          const result = await galleryCollection.insertOne(myToy);
          res.send(result)
      })

      // ============ Toys =============
      // read data
      app.get('/gallery', async (req, res) => {
        //   let query = {};
        //   if (req.query?.email) {
        //       query = { email: req.query.email }
        //   }


          const cursor = galleryCollection.find();
          const result = await cursor.toArray();
          res.send(result);
      })

      // read single data from db
      app.get('/toys/:id', async (req, res) => {
          const id = req.params.id;
          const query = { _id: new ObjectId(id) };
          const result = await toyCollection.findOne(query);
          res.send(result);
      })


      // send data to database
      app.post('/toys', async (req, res) => {
          const toy = req.body;
         
          const result = await toyCollection.insertOne(toy);
          res.send(result)
      })

      // update single toy data
      app.put('/toys/:id', async (req, res) => {
          const id = req.params.id;
          const filter = { _id: new ObjectId(id) };
          const options = { upsert: true };
          const updatedToy = req.body;
          const toy = {
              $set: {
                  quantity: updatedToy.quantity,
                  description: updatedToy.description,
                  price: updatedToy.price
              }
          }
          const result = await toyCollection.updateOne(filter, toy, options);
          res.send(result);
      })

      app.delete('/toys/:id', async (req, res) => {
          const id = req.params.id;
          const query = { _id: new ObjectId(id) };
          const result = await toyCollection.deleteOne(query);
          res.send(result);
      })

      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
//  await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send(`<h2>Toy Car server is running</h2>`)
})


app.listen(port, () => {
  console.log(`Toy Car server is running ${port}`)
})