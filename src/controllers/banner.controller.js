import {
  wrapAsync,
  ValidationError,
  sendResponse,
} from "../utils/handler.utils.js";

import Banner from "../models/banner.model.js";

export const createBanner = wrapAsync(
  async (req, res) => {
    const { title } = req.body;

    if (!title) {
      throw new ValidationError(
        "Title is required"
      );
    }

    if (!req.file || !req.file.path) {
      throw new ValidationError(
        "Image is required"
      );
    }

    const banner = await Banner.create({
      title,
      image: req.file.path,
    });

    sendResponse(res, {
        status:200,
        success:true,
        message:"Banner created successfully",
        data: banner
    });
  }
);

export const getBanners = wrapAsync(async (req, res) => {
    const banners = await Banner.find().sort({createdAt: -1});

    sendResponse(res, {
        status:200,
        success:true,
        message:"Banners retrieved successfully",
        data: banners
    });
});

export const getBannerById = wrapAsync(async (req, res) => {
    const {id} = req.params;

    const banner = await Banner.findById(id);

     sendResponse(res, {
            status:200,
            success:true,
            message:"Banner retrieved successfully",
            data: banner
        });
});

export const deleteBanner = wrapAsync(async (req, res) => {
    const {id} = req.params;

    const banner = await Banner.findByIdAndDelete(id);

    if(!banner){
        throw new ValidationError("Banner not found");
    }
    sendResponse(res, {
            status:200,
            success:true,
            message:"Banner deleted successfully",
            data: banner
        });
});

export const updateBanner = wrapAsync(
  async (req, res) => {
    const { id } = req.params;

    const updateData = {};

    if (req.body.title) {
      updateData.title = req.body.title;
    }

    if (req.file) {
      updateData.image = req.file.path;
    }

    const banner =
      await Banner.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );

    if (!banner) {
      throw new ValidationError(
        "Banner not found"
      );
    }

    sendResponse(res, {
      status: 200,
      success: true,
      message:
        "Banner updated successfully",
      data: banner,
    });
  }
);