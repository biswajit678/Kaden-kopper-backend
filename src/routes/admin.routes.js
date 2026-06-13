import Router from "express";
import adminAuthRouter from "./adminAuth.routes.js";
import bannerRouter from "./banner.routes.js";
import contactRouter from "./contact.routes.js";
import serviceRouter from "./service.routes.js";
import galleryRouter from "./gallery.routes.js";
import projectRouter from "./project.routes.js";


const router = Router();

router.use("/auth", adminAuthRouter);

router.use("/banner", bannerRouter);

router.use("/project", projectRouter);

router.use("/gallery", galleryRouter);

router.use("/service", serviceRouter);

router.use("/contact", contactRouter);

export default router;