import express from "express";
import requireAuth from "../middleware/requireAuth.js";
import {
  createReservation,
  listReservations,
  approveReservation,
  rejectReservation,
  cancelReservation,
} from "../controllers/reservationController.js";

const router = express.Router();

router.use(requireAuth);

// Create reservation
router.post("/", createReservation);

// Get list of reservarions
router.get("/", listReservations);

// Approve, reject
router.patch("/:id/approve", approveReservation);
router.patch("/:id/reject", rejectReservation);

// Client cancel
router.patch("/:id/cancel", cancelReservation);

export default router;
