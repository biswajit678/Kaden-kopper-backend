import Project from "../models/project.model.js";
import { sendResponse, ValidationError, wrapAsync } from "../utils/handler.utils.js";

export const createProject = wrapAsync(async (req, res) => {
    const {title, description, feature} = req.body;

    if(!title || !description || !feature){
        throw new Validationerror("All fields are required");
    }

    const project = await Project.create({
        title,
        description,
        feature
    });
    sendResponse(res, {
      status: 200,
      success: true,
      message:
        "Project Created successfully",
      data: project,
    });
})

export const getProjects = wrapAsync(async (req, res) => {
    const project = await Project.find().sort({createdAt: -1});

    sendResponse(res, {
        status: 200,
        success: true,
        message: "Projects retrieved successfully",
        data: project
    });
});

export const getProjectsById = wrapAsync(async (req, res) => {
    const {id} = req.params;
    const project = await Project.findById(id);

    sendResponse(res, {
        status: 200,
        success: true,
        message: "Projects retrieved successfully",
        data: project
    });
});

export const deleteProject = wrapAsync(async (req, res) => {
    const {id} = req.params;
    const project = await Project.findByIdAndDelete(id);

    if(!project){
        throw new validationError("Project not found");
    }

    sendResponse(res, {
        status: 200,
        success: true,
        message: "Project deleted successfully",
        data: project
    });
});

export const updateProject = wrapAsync(async (req, res) => {
    const {id}  =req.params;
    const [title, description, feature] = req.body;

    const project = await Project.findByIdAndUpdate(id, {
        title,
        description,
        feature
    }, {new: true});

    if(!project){
        throw new ValidationError("Project not found")
    }

    sendResponse(res, {
        status: 200,
        success: true,
        message: "Project updated successfully",
        data: project
    });
});


export const addImageToProject = wrapAsync(async (req, res) => {
  const { id } = req.params;

  if (!req.files || req.files.length === 0) {
    throw new ValidationError("No images provided");
  }

 const images = req.files.map(file => file.path);

  const project = await Project.findByIdAndUpdate(
    id,
    {
      $push: {
        images: {
          $each: images
        }
      }
    },
    { new: true }
  );

  if (!project) {
    throw new ValidationError("Project not found");
  }

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Images added successfully",
    data: project,
  });
});

export const removeImageFromProject = wrapAsync(async (req, res) => {
  const {projectId, imageId} = req.body;

  const project = await Project.findByIdAndUpdate(
    projectId,
    {
      $pull: {
        images: { _id: imageId },
      },
    },
    { new: true }
  );

  if (!project) {
    throw new ValidationError("Project not found");
  }

  sendResponse(res, {
    status: 200,
    success: true,
    message: "Image removed successfully",
    data: project,
  });
});