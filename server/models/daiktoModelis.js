import mongoose from "mongoose";

const Schema = mongoose.Schema;

const daiktoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    about: { type: String, required: true },
    price: {
      type: Number,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    availability: {
      type: Boolean,
      required: false,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Daiktas", daiktoSchema);
