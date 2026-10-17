import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
   <footer className="bg-[#0b1b2b] text-gray-200 pt-14 border-t border-gray-700">

      <div className="max-w-7xl mx-auto px-6">
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12">
          
          {/* 1️⃣ Mannat Foundation Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Mannat Foundation
            </h3>

            <p className="text-sm leading-relaxed mb-4">
              Mannat Foundation is a non-profit organization working to support
              communities through education, welfare, and social awareness.
            </p>

            <p className="text-xs text-gray-400 mt-4 leading-relaxed">
              Committed to transparency, community welfare, and sustainable grassroots empowerment.
            </p>
          </div>

          {/* 2️⃣ Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2">
                  <li>
                    <Link to="/about" className="hover:text-green-400 transition">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/our-work" className="hover:text-green-400 transition">
                      Our Work
                    </Link>
                  </li>
                  <li>
                    <Link to="/gallery" className="hover:text-green-400 transition">
                      Gallery
                    </Link>
                  </li>
                  <li>
                    <Link to="/join-us" className="hover:text-green-400 transition">
                      Join Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="hover:text-green-400 transition">
                      Contact
                    </Link>
                  </li>
                </ul>

          </div>

          {/* 3️⃣ Donate */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Donate
            </h3>

            <ul className="space-y-2">
              <li>
                <Link to="/donate" className="hover:text-green-400 transition">
                  Education Support
                </Link>
              </li>
              <li>
                <Link to="/donate" className="hover:text-green-400 transition">
                  Community Welfare
                </Link>
              </li>
              <li>
                <Link to="/donate" className="hover:text-green-400 transition">
                  Senior Citizen Care
                </Link>
              </li>
              <li>
                <Link to="/donate" className="hover:text-green-400 transition">
                  Animal Care
                </Link>
              </li>
            </ul>

          </div>

          {/* 4️⃣ Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Contact
            </h3>

            <p className="text-sm mb-4">
              <a
                  href="mailto:contact@mannatfoundation.org"
                  className="hover:text-green-400 transition"
                >
                  📧 contact@mannatfoundation.org
                </a>    
            </p>
            <p className="text-sm mb-6">
               <a
                  href="tel:+919XXXXXXXXX"
                  className="hover:text-green-400 transition"
                >
                  📞 +91 9XXXXXXXXX
                </a>
                              
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-4">
              <a
                href="#"
                className="p-2 rounded-full border border-gray-500 hover:border-green-400 hover:text-green-400 transition"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="p-2 rounded-full border border-gray-500 hover:border-green-400 hover:text-green-400 transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="p-2 rounded-full border border-gray-500 hover:border-green-400 hover:text-green-400 transition"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 py-6 text-center text-sm text-gray-400">
          © 2026 Mannat Foundation. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
