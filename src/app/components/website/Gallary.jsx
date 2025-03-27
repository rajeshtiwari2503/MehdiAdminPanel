
"use client"
import Image from 'next/image'; // Next.js optimized image component
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import http_request from '../../../../http-request';
import { ReactLoader } from '../common/Loading';
import { FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

const Gallery = () => {


  const [selectedImage, setSelectedImage] = useState(null);
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
  const handleImageClick = (image) => {
    setSelectedImage(image); // Set clicked image to show in modal
  };

  const closeModal = () => {
    setSelectedImage(null); // Close the modal
  };


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
  // console.log(designs);
  const [fullScreenImage, setFullScreenImage] = useState(null);
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Mehandi Order Gallery
      </h1>

      {/* Gallery Grid */}
      {loading === true ? <ReactLoader />
        :

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
          {designs?.map((item, index) => (
            // <div
            //   key={index}
            //   className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
            //   onClick={() => handleOrder(item)}
            // >

            //   <Image
            //     src={item?.image}
            //     alt={`Mehandi design ${index + 1}`}
            //     width={500}
            //     height={500}
            //     className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            //   />


            //   <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            //     <p className="text-white text-lg font-bold">{item?.name}</p>
            //   </div>
            // </div>
            <div key={index} onClick={() => handleOrder(item)} className=" bg-gray-100 cursor-pointer ">

              {/* <div className="relative w-full h-64 md:h-80">
                  <img
                    src={order?.item?.image || "https://via.placeholder.com/800x400"}
                    alt={order?.item?.name}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                  />
                  <button
                    className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-3"
                   
                  >
                   <FaHeart className="text-red-500" />  
                  </button>
                </div> */}
              <div>
                {/* Thumbnail Image */}
                <img
                  src={item?.image || "https://via.placeholder.com/800x400"}
                  alt={item?.name}
                  className="w-full h-[200px] object-cover rounded-lg shadow-md cursor-pointer"
                // onClick={() => setFullScreenImage(item?.image)}
                />


              </div>

              <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-3">
                {/* Header Section */}
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">{item?.name || "Product Name"}</h2>
                  <div className="flex items-center space-x-1">
                    <FaStar className="text-yellow-500" />
                    <span className="text-gray-700 font-medium">
                      {item?.rating}
                    </span>
                    <span className="text-gray-500 text-sm">
                      ({item?.review} Reviews)
                    </span>
                  </div>
                </div>

                {/* Product Description */}
                <p className="text-gray-600 mt-2">
                  Exclusive design {item?.description}. Limited stock only!
                </p>

                {/* Price and Discount Section */}
                <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-red-700 via-yellow-600 to-yellow-400 transition-all duration-300 group hover:from-yellow-400 hover:via-yellow-600 hover:to-red-700">
                  <div className="flex items-center">
                    {/* Display Discounted Price */}
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{item?.price}
                    </span>
                    {/* Show Original Price (Strikethrough) */}
                    <span className="text-gray-700 line-through ml-2">
                    ₹{item?.price && item?.discount ? Math.round(+item.price + (+item.price * +item.discount) / 100) : "0"}
                    </span>
                    {/* Show Discount Percentage */}
                    <span className="text-white ml-2 font-bold text-sm">{item?.discount}% OFF</span>
                  </div>
                </div>
              </div>

            </div>

          ))}
        </div>



      }

      {/* Lightbox Modal for clicked image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="relative">
            <Image
              src={selectedImage}
              alt="Selected Mehandi design"
              width={800}
              height={800}
              className="w-full h-auto max-h-screen object-cover rounded-lg"
            />
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
