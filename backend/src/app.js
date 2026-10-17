import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import multer from "multer";

import authRoutes from "./routes/auth.routes.js";
import galleryRoutes from "./routes/gallery.routes.js";
import joinUsRoutes from "./routes/joinUs.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import donationRoutes from "./routes/donation.routes.js";

const app = express();

app.disable("x-powered-by");

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  ...(process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(",").map((url) => url.trim())
    : []),
].filter(Boolean);

const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  if (allowedOrigins.includes(origin)) return true;
  if (process.env.NODE_ENV !== "production") {
    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
      return true;
    }
  }
  return false;
};

app.use(
  cors({
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use("/api", apiLimiter);

app.get("/api/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Foundation API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/join-us", joinUsRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/donations", donationRoutes);

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "Cross-origin request not allowed",
    });
  }

  if (err instanceof multer.MulterError) {
    const isTooLarge = err.code === "LIMIT_FILE_SIZE";

    return res.status(isTooLarge ? 413 : 400).json({
      success: false,
      message: isTooLarge
        ? "File exceeds the 20MB upload limit"
        : "File upload failed. Check the selected file and try again.",
    });
  }

  // Handle file-type errors thrown by the Multer file filter.
  if (
    err.message?.startsWith(
      "Only matching JPG, JPEG, PNG, WEBP, GIF, MP4, WEBM and MOV files are allowed"
    )
  ) {
    return res.status(400).json({
      success: false,
      message: "Unsupported file type. Upload a supported image or video.",
    });
  }

  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON request body",
    });
  }

  const status =
    Number.isInteger(err.status) && err.status >= 400 && err.status < 600
      ? err.status
      : 500;

  if (status >= 500) {
    console.error("API error:", err.message);
  }

  return res.status(status).json({
    success: false,
    message:
      status === 413
        ? "Request payload is too large"
        : process.env.NODE_ENV === "production"
          ? "Something went wrong"
          : err.message || "Internal server error",
  });
});

export default app;
