/**
 * Automatically applies Cloudinary compression, modern format conversion (WebP/AVIF),
 * and responsive dimension scaling to images and videos.
 *
 * @param {string} url - Original media URL
 * @param {'image' | 'video'} type - Media type
 * @param {'thumbnail' | 'lightbox' | 'full'} size - Desired display size
 * @returns {string} Fully optimized URL
 */
export const getOptimizedMediaUrl = (url, type = "image", size = "thumbnail") => {
  if (!url || typeof url !== "string") return "";

  // If not a Cloudinary delivery URL, return directly
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) {
    return url;
  }

  // If URL already includes /f_auto, check if width needs constraining for thumbnails
  if (url.includes("/f_auto") || url.includes("/q_auto")) {
    if (size === "thumbnail" && !url.includes("w_")) {
      return url.replace("/upload/", "/upload/w_600,c_limit/");
    }
    return url;
  }

  if (type === "video") {
    // Cloudinary video auto-transcoding & bandwidth compression
    const videoTransform =
      size === "thumbnail"
        ? "f_auto,q_auto,vc_auto,w_600,c_limit"
        : "f_auto,q_auto,vc_auto,w_1280,c_limit";

    return url.replace("/upload/", `/upload/${videoTransform}/`);
  }

  // Image optimization: WebP/AVIF auto-format, adaptive quality, max width cap
  const imgTransform =
    size === "thumbnail"
      ? "f_auto,q_auto:good,w_600,c_limit"
      : size === "lightbox"
      ? "f_auto,q_auto:good,w_1400,c_limit"
      : "f_auto,q_auto:good,w_1600,c_limit";

  return url.replace("/upload/", `/upload/${imgTransform}/`);
};

export default getOptimizedMediaUrl;
