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
      setLoading(true)
      const response = await http_request.get("/getAllMehndiDesign");
      const { data } = response;
      setDesigns(data);
      setLoading(false)
    } catch (error) {
      setLoading(false)

      console.error("Error fetching designs:", error);
    }
  };

  const handleOrder = (item) => {
    const orderData = { item, user };
    if (user) {
      localStorage.setItem("orderM", JSON.stringify(orderData));
      router.push("/myOrders");
    } else {
      alert("Please Login");
      router.push("/sign_in");
    }
  };


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <div className=" pb-5 container md:mx-auto md:px-10">
      {/* <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Our Mehndi Designs
      </h1> */}
      <>
        {loading === true ? <ReactLoader />


          : <Slider {...settings}>
            {designs?.map((design, index) => (
              <div key={index} className="md:p-4 p-0">
                <div className="flex flex-col items-center bg-white rounded-lg shadow-lg md:p-6 p-2">
                  <img
                    src={design.image}
                    alt={design.title}
                    className="w-full md:h-32 h-20 object-cover rounded-lg mb-4"
                  />
                  <h2 className="mt-2 md:text-lg text-sm font-bold">{design.name}</h2>
                  {/* <p className="text-gray-600 text-sm mt-2 text-center">
                {design.description}
              </p> */}
                </div>
              </div>
            ))}
          </Slider>
        }
         </>
      </div>
      );
};

      export default MehndiDesignSlider;
