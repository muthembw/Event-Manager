const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config(); // ✅ Load .env BEFORE using process.env
const PORT = process.env.PORT || 3000;

connectDB(); // ✅ Connect to MongoDB

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/events", require("./routes/eventRoute"));

app.get("/", (req, res) => {
    res.send("Welcome to the API!");
  });
  
// Start Server
app.listen(PORT, () =>
  console.log(`✅ Server running via http://localhost:${PORT}`)
);
