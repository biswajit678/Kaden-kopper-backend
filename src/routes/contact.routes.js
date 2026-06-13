import Router from "express";
import * as contactController from "../controllers/contact.controller.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/add", contactController.addContact);

router.get("/",authenticate, contactController.getContacts);

export default router;