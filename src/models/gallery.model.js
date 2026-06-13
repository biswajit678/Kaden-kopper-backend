import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
{
  title: String,
  image: [String]
},{timestamps:true}
);

const Gallery = mongoose.model("Gallery", gallerySchema);
export default Gallery;
