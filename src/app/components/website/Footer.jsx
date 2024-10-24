import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-dark-blue md:mb-0 mb-20 text-gray-700 py-2">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
          <div className="mt-2">
            <Link href="#privacy-policy" className="text-gray-700 hover:underline">Privacy Policy</Link >
            <span className="mx-2">|</span>
            <Link href="#terms-of-service" className="text-gray-700 hover:underline">Terms of Service</Link >
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  