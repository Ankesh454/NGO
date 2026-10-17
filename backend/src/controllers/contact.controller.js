import Contact from "../models/Contact.model.js";

export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body ?? {};

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required",
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanMessage = message.trim();
    const cleanSubject =
      typeof subject === "string" ? subject.trim() : "";

    if (cleanName.length < 2 || cleanName.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Name must be between 2 and 100 characters",
      });
    }

    if (
      cleanEmail.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    if (cleanMessage.length < 10 || cleanMessage.length > 5000) {
      return res.status(400).json({
        success: false,
        message: "Message must be between 10 and 5000 characters",
      });
    }

    if (cleanSubject.length > 150) {
      return res.status(400).json({
        success: false,
        message: "Subject cannot exceed 150 characters",
      });
    }

    const data = await Contact.create({
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      message: cleanMessage,
    });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: {
        id: data._id,
        name: data.name,
        email: data.email,
        subject: data.subject,
        createdAt: data.createdAt,
      },
    });
  } catch (error) {
    console.error("Contact submission error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to submit your message right now",
    });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const list = await Contact.find()
      .select("name email subject message createdAt")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: list.length,
      contacts: list,
    });
  } catch (error) {
    console.error("Fetch contacts error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch contact messages",
    });
  }
};
