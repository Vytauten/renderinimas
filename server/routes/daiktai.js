import express from "express";
import * as controller from "../controllers/controller.js";
import requireAuth from "../middleware/requireAuth.js";
import { requireRole } from "../middleware/requireRole.js";

const router = express.Router();
router.use(requireAuth);

//GET paimti visus pratimus
router.get("/", requireRole(["owner", "client"]), controller.getDaiktai);

//GET paimti vieną pratimą
router.get("/:id", requireRole(["owner", "client"]), controller.getDaiktas);

//POST sukurti naują pratimą
router.post("/", requireRole(["owner"]), controller.createDaiktas);

//PATCH redaguoti vieną prartimą

router.patch("/:id", requireRole(["owner"]), controller.updateDaiktas);

//DELETE ištrinti vieną pratimą
router.delete("/:id", requireRole(["owner"]), controller.deleteDaiktas);

export default router;
