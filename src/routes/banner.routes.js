import Router from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import * as bannerController from "../controllers/banner.controller.js";
import upload from "../middleware/imageMiddleware.js";

const router = Router();

router.post("/create", authenticate, upload.single("image"), bannerController.createBanner);
router.get("/", bannerController.getBanners);
router.get("/:id", bannerController.getBannerById);
router.delete("/:id", authenticate, bannerController.deleteBanner);
router.put("/:id", authenticate, upload.single("image"), bannerController.updateBanner);

export default router;