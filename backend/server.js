const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
//Reservation;
// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/REST")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Schema + Model
const reservationSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phone: Number,
    date: String,
    time: String,
  },
  { collection: "rest" }
);

const Reservation = mongoose.model("", reservationSchema);

// POST API
app.post("/api/reservation", async (req, res) => {
  try {
    const newReservation = new Reservation(req.body);
    await newReservation.save();
    res.json({ success: true, message: "Reservation saved successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error saving data" });
  }
});

// GET API
app.get("/api/reservation", async (req, res) => {
  const data = await Reservation.find();
  res.json(data);
});

// Server
app.listen(5000, () => console.log("Server running on port 5000"));
