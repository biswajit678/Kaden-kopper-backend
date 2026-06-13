import Contact from "../models/contact.model.js";
import { sendResponse, ValidationError, wrapAsync } from "../utils/handler.utils.js";

export const addContact = wrapAsync(async (req, res) => {
    const { name, email, phone, message } = req.body;

    if(!name || !email || !phone || !message){
        throw new ValidationError("All fields are required");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        message
    });
    sendResponse(res, {
      status: 200,
      success: true,
      message:
        "Contact created successfully",
      data: contact,
    });
});

export const getContacts = wrapAsync(async (req, res) => {
    const contacts = await Contact.find().sort({createdAt: -1});
    sendResponse(res, {
      status: 200,
      success: true,
      message:
        "Contacts retrieved successfully",
      data: contacts,
    });
});