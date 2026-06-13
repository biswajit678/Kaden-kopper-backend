import mongoose from "mongoose";

const adminAuthSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    // phone: {
    //   type: String,
    //   required: true,
    // },

    profile: {
      type: String,
    },

    password: {
      type: String,
      required: true,
      minlength: 6
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", adminAuthSchema);

export default Admin;