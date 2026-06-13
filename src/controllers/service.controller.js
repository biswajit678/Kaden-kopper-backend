import Service from "../models/service.model.js";
import { sendResponse, ValidationError, wrapAsync } from "../utils/handler.utils.js";

export const createService = wrapAsync(async (req, res) => {
    const {title, description} = req.body;

    if(!title || !description){
        throw new ValidationError("All fields are required")
    }

    if(!req.file){
        throw new ValidationError("Image is required");
    }

    const service = await Service.create({
        title,
        description,
        image:req.file.path
    });
    sendResponse(res, {
      status: 200,
      success: true,
      message:
        "Service created successfully",
      data: service,
    });
});

export const getServices = wrapAsync(async (req, res) => {
    const service = await Service.find().sort({createdAt:-1});

    sendResponse(res, {
      status: 200,
      success: true,
      message:
        "Service fetched successfully",
      data: service,
    });
});

export const getServiceById = wrapAsync(async (req, res) => {
    const {id} = req.params;

    const service = await Service.findById(id);

    sendResponse(res, {
      status: 200,
      success: true,
      message:
        "Service fetched successfully",
      data: service,
    });
});

export const deleteService = wrapAsync(async (req, res) => {
    const {id} = req.params;

    const service = await Service.findByIdAndDelete(id);

    if(!service){
        throw new ValidationError("service not found");
    }

    sendResponse(res, {
      status: 200,
      success: true,
      message:
        "Service deleted successfully",
      data: service,
    });
});

export const editService = wrapAsync(async (req, res) => {
    const {id} = req.params;
    const {title, description} = req.body;

    const updateData = {};

    if (title) {
      updateData.title = req.body.title;
    }
    if (description) {
      updateData.title = req.body.title;
    }

    if (req.file) {
      updateData.image = req.file.path;
    };

    const service =
      await Service.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );

      if(!service){
        throw new ValidationError("Service not exist");
      }

    sendResponse(res, {
      status: 200,
      success: true,
      message:
        "Service updated successfully",
      data: service,
    });
})