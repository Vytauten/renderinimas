import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    daiktas: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Daiktas",
      required: true,
      index: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    fromDate: {
      type: Date,
      required: true,
    },
    toDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "cancelled"],
      default: "pending",
      index: true,
    },
  },
  { timestamps: true }
);

// Overlapping
reservationSchema.index({ daiktas: 1, fromDate: 1, toDate: 1 });

// Blokuoja naujas rezervacijas jei laukiama arba patvirtinta
reservationSchema.statics.isOverlapping = async function (
  daiktasId,
  fromDate,
  toDate,
  activeStatuses = ["pending", "approved"]
) {
  // Nuo kada iki kada
  return await this.findOne({
    daiktas: daiktasId,
    status: { $in: activeStatuses },
    fromDate: { $lte: new Date(toDate) },
    toDate: { $gte: new Date(fromDate) },
  });
};

// kada iki kada ir ne praeityje
reservationSchema.pre("validate", function (next) {
  if (this.fromDate >= this.toDate) {
    return next(new Error("fromDate must be before toDate"));
  }

  const now = new Date();
  if (this.toDate < now) {
    return next(new Error("Reservation period must be in the future"));
  }
  next();
});

export default mongoose.model("Reservation", reservationSchema);
