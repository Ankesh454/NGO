import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  FiUploadCloud,
  FiTrash2,
  FiImage,
  FiFilm,
  FiCheckCircle,
  FiX,
} from "react-icons/fi";
import adminApi from "../services/api";
import { getOptimizedMediaUrl } from "../../utils/cloudinary";
import "./Gallery.css";

export default function Gallery() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchGallery = async () => {
    try {
      setFetching(true);
      const res = await adminApi.get("/gallery");
      setGallery(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load gallery");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    // 100MB max client safeguard
    if (selected.size > 100 * 1024 * 1024) {
      toast.error("File is too large. Please select a file under 100 MB.");
      return;
    }

    setFile(selected);
    const objectUrl = URL.createObjectURL(selected);
    setPreviewUrl(objectUrl);
  };

  const handleClearFile = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select an image or video to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const toastId = toast.loading("Compressing & uploading to Cloudinary...");

    try {
      setLoading(true);

      await adminApi.post("/gallery/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(
        "Upload complete! Compressed & optimized with WebP/AVIF and auto-quality.",
        { id: toastId, duration: 4000 }
      );
      handleClearFile();
      fetchGallery();
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Upload failed. Try again.";
      toast.error(msg, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Permanently delete this media from Cloudinary and database?")) {
      return;
    }

    try {
      setDeletingId(id);
      await adminApi.delete(`/gallery/${id}`);
      toast.success("Media deleted from Cloudinary & database");
      setGallery((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Delete failed. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="gallery-page max-w-7xl mx-auto p-4 sm:p-6">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Gallery Management
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Upload pictures and videos with automatic Cloudinary compression & WebP/AVIF delivery
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <FiCheckCircle className="text-emerald-600" />
            Cloudinary Auto-Compress Active
          </span>
          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
            {gallery.length} Media Items
          </span>
        </div>
      </div>

      {/* Upload Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-10">
        <h3 className="text-base font-bold text-gray-900 mb-2 flex items-center gap-2">
          <FiUploadCloud className="text-emerald-600 text-lg" />
          <span>Upload Media (Auto-Compressed)</span>
        </h3>
        <p className="text-xs text-gray-500 mb-6">
          Files are automatically converted to next-gen formats (WebP/AVIF for photos, H.264/WebM for videos) with perceptual quality compression to load ultra-fast.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* File Picker */}
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-emerald-500 transition bg-gray-50/50">
            <input
              type="file"
              id="gallery-file-input"
              className="hidden"
              accept="image/*,video/*"
              onChange={handleFileChange}
              disabled={loading}
            />
            <label
              htmlFor="gallery-file-input"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl mb-3">
                <FiUploadCloud />
              </div>
              <span className="font-semibold text-sm text-gray-800">
                Click to browse photo or video
              </span>
              <span className="text-xs text-gray-400 mt-1">
                Supports JPG, PNG, WEBP, MP4, MOV (Max 100 MB)
              </span>
            </label>
          </div>

          {/* Selected Preview Box */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 min-h-[140px] flex flex-col justify-between">
            {file ? (
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <div className="flex items-center gap-2 truncate">
                    {file.type.startsWith("video") ? (
                      <FiFilm className="text-purple-600 flex-shrink-0" />
                    ) : (
                      <FiImage className="text-emerald-600 flex-shrink-0" />
                    )}
                    <span className="text-xs font-semibold text-gray-800 truncate">
                      {file.name}
                    </span>
                  </div>
                  <button
                    onClick={handleClearFile}
                    className="text-gray-400 hover:text-red-500 transition p-1"
                    title="Remove selected file"
                  >
                    <FiX />
                  </button>
                </div>

                <div className="mt-3 flex items-center gap-3">
                  {previewUrl && (
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-black/5 flex-shrink-0 border border-gray-200">
                      {file.type.startsWith("video") ? (
                        <video src={previewUrl} className="w-full h-full object-cover" muted />
                      ) : (
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      )}
                    </div>
                  )}
                  <div className="text-xs space-y-1">
                    <p className="text-gray-500">
                      Raw file size: <span className="font-bold text-gray-800">{formatFileSize(file.size)}</span>
                    </p>
                    <p className="text-emerald-700 font-medium">
                      ✓ Will auto-compress ~60-85% on Cloudinary
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleUpload}
                  disabled={loading}
                  className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-xl text-sm shadow transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>Compressing & Uploading...</span>
                  ) : (
                    <span>Upload & Auto-Compress Now</span>
                  )}
                </button>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-6 text-gray-400">
                <FiImage className="text-3xl mb-2 opacity-40" />
                <span className="text-xs">No media file selected yet</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Gallery Items Grid */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Live Media Library ({gallery.length})
        </h3>

        {fetching ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-56 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : gallery.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 text-gray-500">
            No gallery items found. Upload your first picture or video above!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {gallery.map((item) => {
              const isVideo = item.type === "video";
              const optimizedUrl = getOptimizedMediaUrl(item.url, item.type, "thumbnail");

              return (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col justify-between group"
                >
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    {isVideo ? (
                      <video
                        src={optimizedUrl}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                        loop
                      />
                    ) : (
                      <img
                        src={optimizedUrl}
                        alt="Gallery media"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}

                    {/* Tag badge */}
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/60 text-white text-[11px] font-medium backdrop-blur-md flex items-center gap-1.5">
                      {isVideo ? <FiFilm /> : <FiImage />}
                      <span>{isVideo ? "Video" : "Photo"} • Auto-Optimized</span>
                    </span>
                  </div>

                  <div className="p-3 bg-white border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] text-gray-400 font-medium">
                      Cloudinary CDN
                    </span>
                    <button
                      onClick={() => handleDelete(item._id)}
                      disabled={deletingId === item._id}
                      className="text-red-600 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 text-sm transition flex items-center gap-1 font-semibold"
                      title="Delete from Cloudinary"
                    >
                      <FiTrash2 />
                      <span className="text-xs">
                        {deletingId === item._id ? "Deleting..." : "Delete"}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

