 "use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Hook to get the current pathname

import { FaHome, FaImages, FaCommentDots, FaUser } from 'react-icons/fa';

const BottomTabNavigation = () => {
  const pathname = usePathname(); // Get the current pathname

  const navItems = [
    { href: '/', label: 'Home', icon: <FaHome /> },
    { href: '/myOrders', label: 'Orders', icon: <FaImages /> },
    { href: '/contact', label: 'Contact', icon: <FaCommentDots /> },
    { href: '/userProfile', label: 'Profile', icon: <FaUser /> },
  ];

  return (
    <footer className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 z-10">
      <nav className="flex justify-between px-6 py-3 text-center text-gray-500">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center text-sm transition-colors duration-300 ${
              pathname === item.href
                ? 'text-teal-500 font-semibold border-t-2 border-teal-500'
                : 'hover:text-teal-500'
            }`}
          >
            <div className={`text-xl ${pathname === item.href ? 'text-teal-500' : ''}`}>
              {item.icon}
            </div>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </footer>
  );
};

export default BottomTabNavigation;
