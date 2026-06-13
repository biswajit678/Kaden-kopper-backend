import Gallery from "../models/gallery.model.js";
import { sendResponse, ValidationError, wrapAsync } from "../utils/handler.utils.js";

export const createGallery = wrapAsync(async (req, res) => {
    const { title } = req.body;

    if(!title){
        throw new ValidationError("Title is required");
    }
    if(!req.file || !req.file.path){
        throw new ValidationError("Image is required");
    }
    const gallery = await Gallery.create({
        title,
        image: req.file.path
    });

    sendResponse(res, {
      status: 200,
      success: true,
      message:
        "Gallery created successfully",
      data: gallery,
    });
});

export const getGalleries = wrapAsync(async (req, res) => {
    const galleries = await Gallery.find().sort({createdAt: -1});

    sendResponse(res, {
          status: 200,
          success: true,
          message:
            "Galleries retrieved successfully",
          data: galleries,
        });
});

export const getGalleryById = wrapAsync(async (req, res) => {
    const {id} = req.params;

    const gallery = await Gallery.findById(id);

    sendResponse(res, {
          status: 200,
          success: true,
          message:
            "Gallery retrieved successfully",
          data: gallery,
    });
});

export const deleteGallery = wrapAsync(async (req, res) => {
    const {id} = req.params;

    const gallery = await Gallery.findByIdAndDelete(id);

    if(!gallery){
        throw new ValidationError("gallery not found");
    }

    sendResponse(res, {
          status: 200,
          success: true,
          message:
            "Gallery deleted successfully",
          data: gallery,
    });
});

export const updateGallery = wrapAsync(async (req, res) => {
    const {id} = req.params;
    const {title} = req.body;

    const updateData = {};

    if (req.body.title) {
      updateData.title = req.body.title;
    }

    if (req.file) {
      updateData.image = req.file.path;
    }

    const gallery = await Gallery.findByIdAndUpdate(id, updateData, {new: true});

    sendResponse(res, {
          status: 200,
          success: true,
          message:
            "Gallery updated successfully",
          data: gallery,
    });
});