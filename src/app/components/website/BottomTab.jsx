import Link from 'next/link';
import { FaHome, FaImages, FaCommentDots, FaUser } from 'react-icons/fa'; // Import icons

const BottomTabNavigation = () => {
  return (
    <footer className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-300">
      <nav className="flex justify-between px-6 py-3 text-center text-gray-500">
        <Link href="/" className="flex flex-col items-center text-sm hover:text-teal-500 transition-colors duration-300">
          <FaHome className="text-xl" />
          <span>Home</span>
        </Link>
        <Link href="#gallery" className="flex flex-col items-center text-sm hover:text-teal-500 transition-colors duration-300">
          <FaImages className="text-xl" />
          <span>Orders</span>
        </Link>
        <Link href="#gallery" className="flex flex-col items-center text-sm hover:text-teal-500 transition-colors duration-300">
          <FaImages className="text-xl" />
          <span>Gallery</span>
        </Link>
        <Link href="#testimonials" className="flex flex-col items-center text-sm hover:text-teal-500 transition-colors duration-300">
          <FaCommentDots className="text-xl" />
          <span>Testimonials</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center text-sm hover:text-teal-500 transition-colors duration-300">
          <FaUser className="text-xl" />
          <span>Profile</span>
        </Link>
      </nav>
    </footer>
  );
};

export default BottomTabNavigation;
