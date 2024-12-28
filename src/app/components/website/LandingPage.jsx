// import Link from "next/link";
// import Footer from "./Footer";
// import Gallery from "./Gallary";
// import Layout from "./HeaderLayout";
// import TestimonialSlider from "./Testomonials";
// import DesignSection from "./DesignSection";
// import MehndiDesignSlider from "./DesignSlider";



// const LandingPage = () => {
//   return (
//     <>
//       <Layout />
//       <main className="bg-white  px-3 md:px-10 ms:px-4 ">

//         {/* Welcome Section */}
//         <section className="text-center">
//           <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-yellow-500 mb-4">
//             Welcome to Mehandi Designs
//           </h1>
//           <h3 className="text-xl inline-flex font-bold  text-white  bg-blue-500  rounded-md px-4 p-2  mb-4">
//             S Mehndi है जहाँ खुशियाँ हैं वहाँ
//           </h3>
//           <p className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-yellow-500 mb-8">
//             Explore our beautiful, traditional, and modern Mehandi designs for all occasions.
//           </p>

//           <MehndiDesignSlider />
//           <section className="bg-gradient-to-r rounded-md from-red-700 mb-12 via-yellow-600 to-yellow-400 mt-12 py-10 text-white text-center">
//           <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
//           <Link href="/sign_up">
//             <button className="bg-white text-red-700 font-bold py-2 px-4 rounded-lg transition duration-300 hover:bg-gray-200">
//               Sign Up Now
//             </button>
//           </Link>
//         </section>
//           <div
//             className="inline-flex  cursor-pointer px-6 py-3 rounded text-amber-700 bg-white border border-amber-700 
//   hover:bg-gradient-to-r hover:from-amber-700 hover:to-yellow-500 hover:text-white transition duration-300"
//           >
//             Explore Services
//           </div>


//         </section>

//         {/* Services Section */}
//         <DesignSection />




//         {/* Gallery Section */}
//         <section id="gallery" className="mt-12">
//           <Gallery />
//         </section>

//         {/* Contact Section */}
//         <section id="contact" className="mt-12   pt-4 text-center bg-gray-100  ">
//           <h3 className="text-3xl font-bold text-gray-800 mb-4">Testomonials</h3>
//           <p>Get in touch to book an appointment or learn more about our services.</p>
//           <TestimonialSlider />
//         </section>
//       </main>
//       <Footer />
//     </>
//   );
// };

// export default LandingPage;




import { motion } from "framer-motion";
import Link from "next/link";
import Footer from "./Footer";
import Gallery from "./Gallary";
import Layout from "./HeaderLayout";
import TestimonialSlider from "./Testomonials";
import DesignSection from "./DesignSection";
import MehndiDesignSlider from "./DesignSlider";
import { Search } from "@mui/icons-material";



const LandingPage = () => {
  // Custom Framer Motion Animation Variants
  const BounceEffect = {
    hidden: { y: -20 },
    visible: {
      y: [0, -10, 0], // Bounce up and down
      transition: { repeat: Infinity, duration: 1 },
    },
  };

  const LeftToRight = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const RightToLeft = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <>
      <Layout />
      <main className="bg-white ">
        {/* Welcome Section */}
        <section className="text-center bg-[#58110f] px-3 md:px-10 ms:px-4">
          <motion.h1
            className="text-4xl pt-8 font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-yellow-500 mb-4"
            initial="hidden"
            animate="visible"
            variants={RightToLeft}
          >
            Welcome to Mehandi Designs
          </motion.h1>

          <motion.h3
            className="text-xl inline-flex font-bold text-white bg-gradient-to-r from-amber-700 to-yellow-500 rounded-md px-4 p-2 mb-4 animate-bounce"
            initial="hidden"
            animate="visible"
            variants={LeftToRight}
          >
            {/* S Mehndi है जहाँ खुशियाँ हैं वहाँ */}
            S Mehndi is where there is happiness.
          </motion.h3>

          <motion.p
            className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-yellow-500 mb-8"
            initial="hidden"
            animate="visible"
            variants={BounceEffect}
          >
            Explore our beautiful, traditional, and modern Mehandi designs for all occasions.
          </motion.p>
          <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-yellow-500 to-amber-700 rounded-md shadow-md mb-10">
            <motion.p
              className="text-2xl text-white font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-yellow-500 mb-4"
              initial="hidden"
              animate="visible"
              variants={BounceEffect}
            >
              Home Service Available
            </motion.p>
            <p className="text-white  text-center ">
              Enjoy the comfort of professional stylists and traditional mehndi artists delivered straight to your home for all occasions.
            </p>

          </div>


          {/* Slider Animation */}
          <motion.div
            className="transition-transform hover:scale-110"
            initial="hidden"
            animate="visible"
            variants={BounceEffect}
          >
            <MehndiDesignSlider />
          </motion.div>

          {/* Call-to-Action */}
          <motion.section
            className="bg-gradient-to-r rounded-md from-red-700 mb-12 via-yellow-600 to-yellow-400 mt-12 py-10 text-white text-center"
            initial="hidden"
            animate="visible"
            variants={BounceEffect}
          >
            <h2 className="text-2xl font-bold mb-4 animate-pulse">Ready to Get Started?</h2>
            <Link href="/sign_up" className="animate-bounce">
              <motion.span
                className="bg-white text-red-700 font-bold py-2 px-4 rounded-lg transition-transform hover:scale-110 "
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up Now
              </motion.span>
            </Link>
          </motion.section>

          <motion.div
            className="inline-flex cursor-pointer px-11 py-3 mb-7 rounded-md text-amber-700 bg-gradient-to-r   from-red-700   via-yellow-600 to-yellow-400 border border-amber-700 
            hover:bg-gradient-to-r hover:from-amber-700 hover:to-yellow-500 hover:text-white transition-transform hover:scale-110 animate-bounce"
            initial="hidden"
            animate="visible"
          // variants={BounceEffect}
          >
            <div className="container mx-auto flex items-center justify-center px-2 py-3">
              <div className="w-full max-w-md">
                <div className="relative">
                  {/* Input Field */}
                  <input
                    type="text"
                    placeholder="Order and Group Order and Design"
                    className="w-full p-3 pl-14 text-sm md:text-base text-red-500 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />

                  {/* Larger Search Icon */}
                  <Search
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                    style={{ fontSize: "2rem" }}
                  />
                </div>
              </div>
            </div>

          </motion.div>
        </section>

        {/* Services Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={BounceEffect}
        >
          <DesignSection />
        </motion.div>

        {/* Gallery Section */}
        <section id="gallery" className="mt-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={BounceEffect}
          >
            <Gallery />
          </motion.div>
        </section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          className="mt-12 pt-4 text-center bg-gray-100"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={LeftToRight}
        >
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Testimonials</h3>
          <p>Get in touch to book an appointment or learn more about our services.</p>
          <TestimonialSlider />
        </motion.section>
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;

