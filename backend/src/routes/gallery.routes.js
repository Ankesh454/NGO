import express from "express";

import upload from "../middlewares/multer.js";
import protectAdmin from "../middlewares/auth.middleware.js";

import {
  uploadMedia,
  getGallery,
  deleteMedia,
} from "../controllers/gallery.controller.js";

const router = express.Router();

// Public route: Anyone can view gallery
router.get("/", getGallery);

// Protected routes: Admin only
router.post(
  "/upload",
  protectAdmin,
  upload.single("file"),
  uploadMedia
);

router.delete(
  "/:id",
  protectAdmin,
  deleteMedia
);

export default router;