//cd MyStartup/ThreadWear/threadwear/backend
const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");

connectToMongo();
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/design", require("./routes/design"));
app.use("/api/cart", require("./routes/cart"));

app.listen(port, () => {
  console.log(`ThreadWear backend listening on port ${port}`);
});
