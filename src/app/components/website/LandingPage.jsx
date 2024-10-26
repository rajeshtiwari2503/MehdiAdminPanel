import Link from "next/link";
import Footer from "./Footer";
import Gallery from "./Gallary";
import Layout from "./HeaderLayout";
import TestimonialSlider from "./Testomonials";
import DesignSection from "./DesignSection";



const LandingPage = () => {
  return (
    <>
      <Layout />
      <main className="bg-white px-10 ">
        {/* Welcome Section */}
        <section className="text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-yellow-500 mb-4">
            Welcome to Mehandi Designs
          </h1>
          <h3 className="text-xl font-bold   text-red-500   mb-4">
         S Mehndi है जहाँ खुशियाँ हैं वहाँ 
          </h3>
          <p className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-yellow-500 mb-8">
            Explore our beautiful, traditional, and modern Mehandi designs for all occasions.
          </p>
          <a
            href="#services"
            className="px-6 py-3 rounded text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-yellow-500 border border-amber-700 hover:bg-amber-700 hover:text-white transition duration-300"
          >
            Explore Services
          </a>
        </section>

        {/* Services Section */}
       <DesignSection />

        <section className="bg-gradient-to-r rounded-md from-red-700 via-yellow-600 to-yellow-400 mt-12 py-10 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <Link href="/sign_up">
            <button className="bg-white text-red-700 font-bold py-2 px-4 rounded-lg transition duration-300 hover:bg-gray-200">
              Sign Up Now
            </button>
          </Link>
        </section>


        {/* Gallery Section */}
        <section id="gallery" className="mt-12">
          <Gallery />
        </section>

        {/* Contact Section */}
        <section id="contact" className="mt-12 pt-4 text-center bg-gray-100  ">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Testomonials</h3>
          <p>Get in touch to book an appointment or learn more about our services.</p>
          <TestimonialSlider />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
