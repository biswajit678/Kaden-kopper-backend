import {wrapAsync, ValidationError, sendResponse} from "../utils/handler.utils.js";
import Admin from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.utils.js";

export const signup = wrapAsync(async (req, res) => {
    const {name, email, password} = req.body;

    if(!email || !password){
        throw new ValidationError("Email and password are required");
    }

    const existing = await Admin.findOne({email});

    if(existing){
        throw new ValidationError("This email is Already exist");
    }

    if(password.length < 6){
      throw new ValidationError("Password must be 6 char long");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
        name, 
        email,
        password: hashedPassword
    });
    
    const token = generateToken(admin._id);

    sendResponse(res, {
        status:201,
        success:true,
        message:"Admin created successfully",
        data:{
            admin,
            token
        },
    });
});

export const login = wrapAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ValidationError(
      "Email and Password are required"
    );
  }

  const admin = await Admin.findOne({
    email,
  }).select("+password");

  if (!admin) {
    throw new ValidationError(
      "Invalid Credentials"
    );
  }

  const isMatch = await bcrypt.compare(
    password,
    admin.password
  );

  if (!isMatch) {
    throw new ValidationError(
      "Invalid Credentials"
    );
  }

  const token = generateToken(admin._id);

//   admin.password = undefined;

 return sendResponse(res, {
        status:201,
        success:true,
        message:"Admin created successfully",
        data:{
            admin,
            token
        },
    });
});

export const getProfile = wrapAsync(async (req, res) => {
    const userId = req.user.id;

    const admin = await Admin.findById(userId).select("-password");

    sendResponse(res, {
        status:200,
        success:true,
        message:"Admin profile retrieved successfully",
        data: admin
    });
});