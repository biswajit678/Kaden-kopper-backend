import Router from "express";
import * as galleryContgroller from "../controllers/gallery.controller.js";
import { authenticate } from "../middleware/authMiddleware.js";
import upload from "../middleware/imageMiddleware.js";

const router = Router();

router.post("/add", authenticate, upload.single("image"), galleryContgroller.createGallery);

router.get("/", galleryContgroller.getGalleries);

router.get("/:id", galleryContgroller.getGalleryById);

router.delete("/:id", authenticate, galleryContgroller.deleteGallery);

router.put("/:id", authenticate, galleryContgroller.updateGallery);

export default router;