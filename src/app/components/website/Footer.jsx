import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-red-700 via-yellow-600 to-yellow-400 text-white py-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
          {/* About Us */}
          <div>
            <h2 className="text-lg font-bold mb-4">About Us</h2>
            <p className="text-sm text-gray-200">
              SMehndi is your one-stop destination for exquisite Mehndi designs, professional services, and high-quality products rooted in tradition.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-bold mb-4">Quick Links</h2>
            <ul className="text-sm space-y-2">
              <li>
                <Link href="/privacyPolicy">
                  <span className="hover:underline text-gray-100 cursor-pointer">
                    Privacy Policy
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/term&Conditions">
                  <span className="hover:underline text-gray-100 cursor-pointer">
                    Terms of Service
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="hover:underline text-gray-100 cursor-pointer">
                    Contact Us
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-lg font-bold mb-4">Contact</h2>
            <ul className="text-sm space-y-2">
              <li>
                <strong>Phone:</strong>{" "}
                <Link href="tel:+919219252400">
                  <span className="hover:underline text-gray-100 cursor-pointer">
                    +91 9219252400
                  </span>
                </Link>
              </li>
              <li>
                <strong>Email:</strong>{" "}
                <Link href="mailto:smehndi986@gmail.com">
                  <span className="hover:underline text-gray-100 cursor-pointer">
                    smehndi986@gmail.com
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Office Location */}
          <div>
            <h2 className="text-lg font-bold mb-4">Our Office</h2>
            <p className="text-sm text-gray-200">
              SMehndi.com <br />
              Avdhut Nagar, Basti, Uttar Pradesh, India <br />
              PIN: 272131
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-600 pt-4 text-center">
          <p className="text-sm text-gray-200">
            © {new Date().getFullYear()} SMehndi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
