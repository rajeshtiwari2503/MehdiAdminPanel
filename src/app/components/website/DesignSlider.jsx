import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from 'next/navigation';
import http_request from '../../../../http-request';
import { ReactLoader } from '../common/Loading';

const MehndiDesignSlider = () => {
  const router = useRouter();
  const [designs, setDesigns] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    fetchDesigns();
  }, []);

  const fetchDesigns = async () => {
    try {
      setLoading(true);
      const response = await http_request.get("/getAllMehndiDesign");
      const { data } = response;
      setDesigns(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching designs:", error);
    }
  };

  const handleOrder = (item) => {
    const orderData = { item, user };
    if (user && designs) {
      if (item?.groupOrder === true) {
        localStorage.setItem("orderM", JSON.stringify(orderData));
        router.push("/groupOrder");
      } else {
        localStorage.setItem("orderM", JSON.stringify(orderData));
        router.push("/myOrders");
      }
    } else {
      alert("Please Login");
      router.push("/sign_in");
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 slides by default (for larger screens)
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024, // For tablets
        settings: {
          slidesToShow: 2, // Show 2 slides on tablets
        },
      },
      {
        breakpoint: 768, // For mobile screens
        settings: {
          slidesToShow: 3, // Show 3 slides on mobile devices
          slidesToScroll: 3, // Scroll 3 slides at a time on mobile
        },
      },
    ],
  };
  

  return (
    <div className="container mx-auto px-4 pb-3">
      {loading ? (
        <ReactLoader />
      ) : (
        <Slider {...settings}>
          {designs?.map((design, index) => (
           <div key={index} className="p-2 cursor-pointer" onClick={() => handleOrder(design)}>
           <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-1">
             {/* Image Section */}
             <div className="relative w-full h-20 md:h-48">
               <img
                 src={design.image}
                 alt={design.title}
                 className="w-full h-full object-cover rounded-lg mb-3"
               />
               {/* Design Name in the Center */}
               <h2 className="absolute inset-0 flex items-center justify-center text-yellow-400 md:text-lg text-sm font-bold hover:bg-black/50 bg-opacity-50 rounded-lg">
                 {design.name}
               </h2>
             </div>
           </div>
         </div>
         
          ))}
        </Slider>
      )}
    </div>
  );
};

export default MehndiDesignSlider;
