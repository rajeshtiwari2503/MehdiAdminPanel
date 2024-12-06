
"use client"
import Image from 'next/image'; // Next.js optimized image component
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import http_request from '../../../../http-request';
import { ReactLoader } from '../common/Loading';

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
    const orderData= { item, user };
    if (user) {
      if(item?.groupOrder===true){
        localStorage.setItem("orderM", JSON.stringify(orderData));
        router.push("/groupOrder");
      }else{
        localStorage.setItem("orderM", JSON.stringify(orderData));
        router.push("/myOrders");
      }
    } else {
      alert("Please Login");
      router.push("/sign_in");
    }
  };
  // console.log(designs);
  
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Mehandi Order Gallery
      </h1>

      {/* Gallery Grid */}
      {loading===true?<ReactLoader />
      : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {designs?.map((item, index) => (
        <div
          key={index}
          className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
          onClick={() => handleOrder(item)}
        >
          {/* Image Section */}
          <Image
            src={item?.image}
            alt={`Mehandi design ${index + 1}`}
            width={500}
            height={500}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Overlay Section */}
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <p className="text-white text-lg font-semibold">View Design</p>
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
