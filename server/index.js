const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ Root route (so "Cannot GET /" won't happen)
app.get("/", (req, res) => {
  res.send("Welcome to the Dynamic Form API!");
});

// ✅ Form submit route
app.post("/submit", (req, res) => {
  const formData = req.body;
  console.log("Received form data:", formData);

  // You can save it to DB here

  res.json({ success: true, data: formData });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
