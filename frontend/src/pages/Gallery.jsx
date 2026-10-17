import { useEffect, useState } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import SEO from "../components/common/SEO";
import API from "../services/api";
import { getOptimizedMediaUrl } from "../utils/cloudinary";

Modal.setAppElement("#root");

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await API.get("/gallery");
      setGallery(res.data);
    } catch (err) {
      console.error("Failed to load gallery", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white min-h-screen">
      <SEO
        title="Gallery"
        description="Explore photos from Mannat Foundation's community programs, education drives, and welfare initiatives."
        image="/gallery-og.jpg"
        url="https://mannatfoundation.org/gallery"
      />
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900">
            Our <span className="text-green-700">Gallery</span>
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            A glimpse of our activities and community work.
          </p>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-full h-56 rounded-xl bg-gray-200 animate-pulse" />
            ))}
          </div>
        ) : gallery.length === 0 ? (
          <div className="mt-14 text-center py-12 text-gray-500">
            No gallery items available at this time.
          </div>
        ) : (
          <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {gallery.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelected(item)}
                className="cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-lg bg-gray-100"
              >
                {item.type === "image" ? (
                  <img
                    src={getOptimizedMediaUrl(item.url, "image", "thumbnail")}
                    alt="gallery"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-56 object-cover hover:scale-105 transition duration-300"
                  />
                ) : (
                  <video
                    src={getOptimizedMediaUrl(item.url, "video", "thumbnail")}
                    className="w-full h-56 object-cover"
                    muted
                    loop
                    playsInline
                  />
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* LIGHTBOX MODAL */}
      <Modal
        isOpen={!!selected}
        onRequestClose={() => setSelected(null)}
        className="max-w-3xl mx-auto mt-6 bg-white rounded-2xl outline-none p-4 shadow-2xl overflow-hidden"
        overlayClassName="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        {selected && (
          <div>
            {selected.type === "image" ? (
              <img
                src={getOptimizedMediaUrl(selected.url, "image", "lightbox")}
                alt="preview"
                className="w-full max-h-[75vh] object-contain rounded-xl"
              />
            ) : (
              <video
                src={getOptimizedMediaUrl(selected.url, "video", "lightbox")}
                controls
                autoPlay
                className="w-full max-h-[75vh] rounded-xl"
              />
            )}

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setSelected(null)}
                className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2 rounded-xl text-sm font-semibold transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Gallery;
