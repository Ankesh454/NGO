import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const whatsappNumber = "919999999999"; // replace with NGO WhatsApp number
  const message = "Hello, I would like to know more about Mannat Foundation.";

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-700 transition"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={24} />
      <span className="hidden md:inline font-medium">
        Chat with us
      </span>
    </a>
  );
};

export default WhatsAppButton;
