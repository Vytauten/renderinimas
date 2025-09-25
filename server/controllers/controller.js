import Daiktas from "../models/daiktoModelis.js";
import mongoose from "mongoose";

// GET visus saugus
export const getDaiktai = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "You must be logged in" });
    }

    const daiktai = await Daiktas.find({}).sort({ createdAt: -1 });
    res.status(200).json(daiktai);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//GET paimti vieną daiktą
export const getDaiktas = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Tokio daikto nėra" });
  }
  const daiktas = await Daiktas.findById(id);
  if (!daiktas) {
    return res.status(404).json({ error: "Tokio daikto nera" });
  }
  res.status(200).json(daiktas);
};

//POST sukurti naują daiktą
export const createDaiktas = async (req, res) => {
  const { title, about, price, age, availability } = req.body;

  if (!title || !about || !price || !age || !availability) {
    let emptyFields = [];
    if (!title) emptyFields.push("title");
    if (!about) emptyFields.push("about");
    if (!price) emptyFields.push("price");
    if (!age) emptyFields.push("age");
    if (!availability) emptyFields.push("availability");

    return res
      .status(400)
      .json({ error: "Užpildykite visus laukelius", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const daiktas = await Daiktas.create({
      title,
      about,
      price,
      availability,
      age,
      user_id,
    });
    res.status(200).json(daiktas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//PATCH redaguoti vieną daiktą
export const updateDaiktas = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Tokio daikto nera" });
  }

  const daiktas = await Daiktas.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );
  if (!daiktas) {
    return res.status(404).json({ error: "Tokio daikto nera" });
  }
  res.status(200).json(daiktas);
};

//DELETE ištrinti vieną daiktą
export const deleteDaiktas = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Tokio daikto nera" });
  }
  const daiktas = await Daiktas.findOneAndDelete({ _id: id });
  if (!daiktas) {
    return res.status(404).json({ error: "Tokio daikto nera" });
  }
  res.status(200).json(daiktas);
};
