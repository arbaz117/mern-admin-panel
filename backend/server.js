const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 IMPORTANT: working MongoDB connection (Atlas direct)
mongoose.connect("mongodb://Arbaz58117_db_user:arbaz123@ac-0jebniv-shard-00-00.qaidvlv.mongodb.net:27017,ac-0jebniv-shard-00-01.qaidvlv.mongodb.net:27017,ac-0jebniv-shard-00-02.qaidvlv.mongodb.net:27017/?ssl=true&replicaSet=atlas-v0ibk2-shard-0&authSource=admin&appName=Cluster")
  .then(() => console.log("DB Connected ✅"))
  .catch(err => console.log("DB Error ❌", err));

app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

app.listen(5000, () => console.log("Server running on port 5000"));
const userRoute = require("./routes/users");

app.use("/api/users", userRoute);
const authRoute = require("./routes/auth");

app.use("/api/auth", authRoute);