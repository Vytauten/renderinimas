import Reservation from "../models/reservationModel.js";
import Daiktas from "../models/daiktoModelis.js";

// Rezervacijos kūrimas
export const createReservation = async (req, res) => {
  try {
    const { daiktas, fromDate, toDate } = req.body;

    if (req.user.role !== "client") {
      return res.status(403).json({ error: "Tik klientai gali rezervuoti" });
    }

    const foundDaiktas = await Daiktas.findById(daiktas);
    if (!foundDaiktas) {
      return res.status(404).json({ error: "Daiktas nerastas" });
    }

    const reservation = await Reservation.create({
      daiktas,
      client: req.user._id,
      fromDate,
      toDate,
    });

    res.status(201).json(reservation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Tik klientas mato savo rezervacijas
// Owneris mato viską
export const listReservations = async (req, res) => {
  try {
    let reservations;

    if (req.user.role === "client") {
      reservations = await Reservation.find({ client: req.user._id })
        .populate("daiktas")
        .populate("client", "email");
    } else if (req.user.role === "owner") {
      reservations = await Reservation.find()
        .populate("daiktas")
        .populate("client", "email");
    } else {
      return res.status(403).json({ error: "Neturite prieigos" });
    }

    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Patvirtinti rezervaciją
export const approveReservation = async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.status(403).json({ error: "Tik savininkai gali patvirtinti" });
    }

    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ error: "Rezervacija nerasta" });
    }

    reservation.status = "approved";
    await reservation.save();

    res.status(200).json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atmesti rezervaciją
export const rejectReservation = async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.status(403).json({ error: "Tik savininkai gali atmesti" });
    }

    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ error: "Rezervacija nerasta" });
    }

    reservation.status = "rejected";
    await reservation.save();

    res.status(200).json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Klientas atmeta savo rezervacijas
export const cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ error: "Rezervacija nerasta" });
    }

    if (req.user.role === "client") {
      if (reservation.client.toString() !== req.user._id.toString()) {
        return res
          .status(403)
          .json({ error: "Galite atšaukti tik savo rezervacijas" });
      }
    }

    reservation.status = "cancelled";
    await reservation.save();

    res.status(200).json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
