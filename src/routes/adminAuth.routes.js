import Router from "express";
import upload from "../middleware/imageMiddleware.js";
import { authenticate } from "../middleware/authMiddleware.js";
import * as adminAuthController from "../controllers/adminAuth.controller.js";

const router = Router();

router.post("/signup",  adminAuthController.signup);
router.post("/login", adminAuthController.login);
router.get("/profile", authenticate, adminAuthController.getProfile);

export default router;