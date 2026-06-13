import Router from "express";
import * as serviceController from "../controllers/service.controller.js"
import { authenticate } from "../middleware/authMiddleware.js";
import upload from "../middleware/imageMiddleware.js";

const router = Router();

router.post("/add", authenticate,upload.single("image"), serviceController.createService);

router.get("/", serviceController.getServices);

router.get("/:id", serviceController.getServiceById);

router.delete("/:id", authenticate, serviceController.deleteService);

router.put("/:id", authenticate, upload.single("image"), serviceController.editService);

export default router;