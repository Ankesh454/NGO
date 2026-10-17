import { useEffect, useState } from "react";
import API from "../../services/api";
import { Link } from "react-router-dom";
import { getOptimizedMediaUrl } from "../../utils/cloudinary";

const GalleryPreview = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let isMounted = true;
    API
      .get("/gallery")
      .then((res) => {
        if (isMounted && Array.isArray(res.data)) {
          setItems(res.data);
        }
      })
      .catch((err) => console.error("GalleryPreview error:", err));

    return () => {
      isMounted = false;
    };
  }, []);

  if (!items.length) return null;

  return (
    <section className="bg-white py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <h2 className="text-4xl font-bold text-center">
          Our <span className="text-green-600">Gallery</span>
        </h2>
        <p className="mt-4 text-gray-600 text-center">
          Moments from our work, volunteers, and community initiatives.
        </p>

        {/* SCROLLER (Hardware Accelerated CSS Marquee) */}
        <div className="relative mt-12 overflow-hidden mask-fade">
          <div className="animate-marquee flex gap-6">
            {[...items, ...items].map((item, idx) => (
              <div
                key={`${item._id || idx}-${idx}`}
                className="w-72 h-52 flex-shrink-0 rounded-xl overflow-hidden shadow-md group relative bg-gray-100"
              >
                {item.type === "image" ? (
                  <img
                    src={getOptimizedMediaUrl(item.url, "image", "thumbnail")}
                    alt={item.title || "Gallery thumbnail"}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <video
                    src={getOptimizedMediaUrl(item.url, "video", "thumbnail")}
                    muted
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link
            to="/gallery"
            className="inline-block border border-green-700 text-green-700 px-8 py-3 rounded-lg hover:bg-green-700 hover:text-white transition font-medium"
          >
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
