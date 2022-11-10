const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.c1bs29r.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    const menuCollection = client.db("homeFlavorFood").collection("menus");

    const reviewCollection = client.db("homeFlavorFood").collection("reviews");

    app.get("/menus", async (req, res) => {
      const query = {};
      const cursor = menuCollection.find(query);
      const menus = await cursor.toArray();
      res.send(menus);
    });

    app.get("/menus/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const menu = await menuCollection.findOne(query);
      res.send(menu);
    });

    app.post("/reviews", async (req, res) => {
      const review = req.body;
      const result = await reviewCollection.insertOne(review);
      res.send(result);
    });
  } finally {
  }
}
run().catch((error) => console.error(error));
app.get("/", (req, res) => {
  res.send("homeFood server is running");
});
app.listen(port, () => {
  console.log(`homeFood server is running on ${port}`);
});
