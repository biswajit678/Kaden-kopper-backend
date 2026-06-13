import Router from "express";
import * as projectController from "../controllers/project.controller.js";
import {authenticate} from "../middleware/authMiddleware.js";
import upload from "../middleware/imageMiddleware.js";

const router = Router();

router.post("/create", authenticate, projectController.createProject);

router.get("/", projectController.getProjects);

router.get("/:id", projectController.getProjectsById);

router.delete("/:id", authenticate, projectController.deleteProject);

router.put("/:id", authenticate, projectController.updateProject);

router.post("/image/:id", authenticate, upload.array("images", 10), projectController.addImageToProject);

router.put("/remove-image", authenticate, projectController.removeImageFromProject);

export default router;
