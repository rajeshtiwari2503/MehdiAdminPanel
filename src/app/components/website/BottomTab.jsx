"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
 
import { FaHome, FaImages, FaCommentDots, FaUser } from 'react-icons/fa';

const BottomTabNavigation = () => {
  const router = useRouter();
  const { pathname } = router; // Get the current pathname

  return (
    <footer className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 z-10">
      <nav className="flex justify-between px-6 py-3 text-center text-gray-500">
        <Link href="/" className={`flex flex-col items-center text-sm transition-colors duration-300 ${
          pathname === '/' ? 'text-teal-500' : 'hover:text-teal-500'
        }`}>
          <FaHome className="text-xl" />
          <span>Home</span>
        </Link>

        <Link href="/myOrders" className={`flex flex-col items-center text-sm transition-colors duration-300 ${
          pathname === '/myOrders' ? 'text-teal-500' : 'hover:text-teal-500'
        }`}>
          <FaImages className="text-xl" />
          <span>Orders</span>
        </Link>

        <Link href="/contact" className={`flex flex-col items-center text-sm transition-colors duration-300 ${
          pathname === '/contact' ? 'text-teal-500' : 'hover:text-teal-500'
        }`}>
          <FaCommentDots className="text-xl" />
          <span>Contact</span>
        </Link>

        <Link href="/userProfile" className={`flex flex-col items-center text-sm transition-colors duration-300 ${
          pathname === '/userProfile' ? 'text-teal-500' : 'hover:text-teal-500'
        }`}>
          <FaUser className="text-xl" />
          <span>Profile</span>
        </Link>
      </nav>
    </footer>
  );
};

export default BottomTabNavigation;
