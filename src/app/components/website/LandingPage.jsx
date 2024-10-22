import Link from "next/link";
import Footer from "./Footer";
import Gallery from "./Gallary";
import Layout from "./HeaderLayout";
import TestimonialSlider from "./Testomonials";

 

const LandingPage = () => {
  return (
    <>
      <Layout />
      <main className="bg-white ">
        {/* Welcome Section */}
        <section className="text-center">
          <h2 className="text-4xl font-bold text-green-700 mb-4">Welcome to Mehandi Designs</h2>
          <p className="text-xl text-gray-700 mb-8">Explore our beautiful, traditional, and modern Mehandi designs for all occasions.</p>
          <a href="#services" className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">Explore Services</a>
        </section>
        
        {/* Services Section */}
        <section id="services" className="mt-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-white shadow-md rounded-lg">
              <h4 className="text-2xl font-bold mb-2">Bridal Mehandi</h4>
              <p>Intricate designs for brides to enhance their special day.</p>
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg">
              <h4 className="text-2xl font-bold mb-2">Party Mehandi</h4>
              <p>Modern and trendy designs for any party or celebration.</p>
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg">
              <h4 className="text-2xl font-bold mb-2">Traditional Mehandi</h4>
              <p>Beautiful traditional patterns for festivals and family events.</p>
            </div>
          </div>
        </section>
        <section className="bg-teal-500 mt-12 py-10 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        <Link href="/sign_up">
          <button className="bg-white text-teal-500 font-bold py-2 px-4 rounded-lg transition duration-300 hover:bg-gray-200">
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
