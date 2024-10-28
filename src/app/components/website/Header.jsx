
"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Icons for hamburger menu

const Header = () => {
  // Simulate login state, replace with actual authentication logic
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const router=useRouter()
  // Mobile menu toggle state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Sticky state for header on scroll
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [value, setValue] = useState("");

  useEffect(() => {
      const storedValue = localStorage.getItem("user");
      if (storedValue) {
        setIsLoggedIn(true)
          setValue(JSON.parse(storedValue));
      }
  }, []);

 
  // Function to handle logout (replace with actual logout logic)
  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("user")
    router.push("/")
  };

  return (
    <header
    className={`p-2 shadow-lg transition-all duration-300 ${
      isSticky
        ? 'fixed top-0 left-0 w-full bg-gradient-to-r from-red-700 via-yellow-600 to-yellow-400 shadow-md z-50'
        : 'bg-gradient-to-r from-red-700 via-yellow-600 to-yellow-400'
    }`}
    >
      <nav className="container mx-auto flex justify-between items-center">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-1">
          <img
            src="/Logo.png" // Add your logo path here
            alt="Mehandi Logo"
            className="w-28 h-14 object-cover rounded-md"
          />
        </div>

        {/* Hamburger Icon for Mobile */}
        {/* <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white text-3xl">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div> */}

        {/* Navigation Links */}
        <ul className={`flex space-x-6 md:flex ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
          <li>
            <Link href="#testimonials" className="text-white font-medium hover:text-teal-500 transition-colors duration-300">
              Testimonials
            </Link>
          </li>
          <li>
            <Link href="#gallery" className="text-white font-medium hover:text-teal-500 transition-colors duration-300">
              Gallery
            </Link>
          </li>
          <li>
            <Link href="#contact" className="text-white font-medium hover:text-teal-500 transition-colors duration-300">
              Contact
            </Link>
          </li>

          {/* Conditional links based on login state */}
          {isLoggedIn ? (
            <>
              <li>
                <Link href="myOrders" className="text-white font-medium hover:text-teal-500 transition-colors duration-300">
                 My  Orders
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="text-white font-medium hover:text-teal-500 transition-colors duration-300">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/sign_in" className="border-2 border-white px-4 py-2 text-white rounded-lg font-bold hover:bg-white hover:text-teal-500 transition-all duration-300">
                  Sign In
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Mobile Menu (Dropdown) */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center bg-amber-700 py-4 space-y-4">
          <Link href="#testimonials" className="text-white font-medium hover:text-teal-500 transition-colors duration-300" onClick={toggleMenu}>
            Testimonials
          </Link>
          <Link href="#gallery" className="text-white font-medium hover:text-teal-500 transition-colors duration-300" onClick={toggleMenu}>
            Gallery
          </Link>
          <Link href="#contact" className="text-white font-medium hover:text-teal-500 transition-colors duration-300" onClick={toggleMenu}>
            Contact
          </Link>
          {isLoggedIn ? (
            <>
              <Link href="#order" className="text-white font-medium hover:text-teal-500 transition-colors duration-300" onClick={toggleMenu}>
                Order
              </Link>
              <button onClick={handleLogout} className="text-white font-medium hover:text-teal-500 transition-colors duration-300">
                Logout
              </button>
            </>
          ) : (
            <Link href="/sign_in" className="border-2 border-white px-4 py-2 text-white rounded-lg font-bold hover:bg-white hover:text-teal-500 transition-all duration-300" onClick={toggleMenu}>
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
