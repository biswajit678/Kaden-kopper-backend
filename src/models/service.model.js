import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
{
  title: String,
  description: String,
  image: String
},{timestamps:true}
);

const Service = mongoose.model("Service", serviceSchema);
export default Service;