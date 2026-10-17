import JoinUs from "../models/JoinUs.model.js";

export const submitJoinUs = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body ?? {};

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof phone !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !phone.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, email and phone are required",
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();
    const cleanMessage =
      typeof message === "string" ? message.trim() : "";

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

    if (!/^[+()\d\s-]{7,20}$/.test(cleanPhone)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid phone number",
      });
    }

    if (cleanMessage.length > 2000) {
      return res.status(400).json({
        success: false,
        message: "Message cannot exceed 2000 characters",
      });
    }

    const data = await JoinUs.create({
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      message: cleanMessage,
    });

    return res.status(201).json({
      success: true,
      message: "Form submitted successfully",
      data: {
        id: data._id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        createdAt: data.createdAt,
      },
    });
  } catch (error) {
    console.error("Join Us submission error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to submit your application right now",
    });
  }
};

export const getAllJoinUs = async (req, res) => {
  try {
    const list = await JoinUs.find()
      .select("name email phone message createdAt")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: list.length,
      applications: list,
    });
  } catch (error) {
    console.error("Fetch Join Us submissions error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch applications",
    });
  }
};