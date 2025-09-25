import dotenv from "dotenv";
import express from "express";
import daiktaiRoutes from "./routes/daiktai.js";
import mongoose from "mongoose";
import cors from "cors";
import userARoutes from "./routes/userA.js";
import reservationRoutes from "./routes/reservationRoutes.js";

//ENV
dotenv.config();

//express app
const app = express();

//cors
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

//middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/user", userARoutes);
app.use("/api/daiktai", daiktaiRoutes);
app.use("/api/reservations", reservationRoutes);

app.get("/", (req, res) => {
  res.json({ mssg: "Welcome to the app" });
});

//Connect to Mongoose and listen to port
mongoose
  .connect(process.env.URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("listening on port", process.env.PORT);
    });
  })
  .catch((err) => console.log(err));
