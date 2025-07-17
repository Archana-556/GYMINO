require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

const Admission = mongoose.model("Admission", new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  age: Number,
  gender: String,
  goal: String,
  timeSlot: String,
  medical: String,
  startDate: Date,
  createdAt: { type: Date, default: Date.now }
}));

app.get("/", (req, res) => {
 res.sendFile(path.join(__dirname, "index.html"));
});
app.post("/api/admission", async (req, res) => {
  try {
    console.log("POST /api/admission received with body:", req.body);
    await Admission.create(req.body);
    res.json({ success: true, message: "Admission successful" });
  } catch (err) {
    console.error("Error in POST /api/admission:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
