import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
{
  title: String,
  description: String,
  feature: [String],
  images: [String]
},{timestamps:true}
);

const Project = mongoose.model("Project", projectSchema);
export default Project;