
"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import http_request from '../../../http-request';
import { useRouter } from 'next/navigation';
import Layout from '../components/website/HeaderLayout';
import Footer from '../components/website/Footer';
 

const MyDesign = ({ retOrder }) => {
  const router = useRouter();
  const [tab, setTab] = useState('Service'); // State for managing tabs
  const [designs, setDesigns] = useState([]);
  const [customerDesigns, setCustomerDesigns] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDesigns();
    fetchCustomerDesigns();
  }, []);

  const fetchDesigns = async () => {
    try {
      setLoading(true);
      const response = await http_request.get('/getAllMehndiCategory'); // Replace with actual API endpoint
      setDesigns(response.data);
    } catch (error) {
      console.error('Error fetching service designs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomerDesigns = async () => {
    try {
      setLoading(true);
      const response = await http_request.get('/getAllMehndiCategory'); // Replace with actual API endpoint
      setCustomerDesigns(response.data);
    } catch (error) {
      console.error('Error fetching customer designs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOrder = async (item) => {
    if (true /* Replace with actual user authentication logic */) {
      localStorage.setItem('orderM', JSON.stringify(item));
      router.push('/order');
      if (retOrder) {
        retOrder();
      }
    } else {
      alert('Please log in to place an order.');
      router.push('/sign-in');
    }
  };

  return (
    <>
  <Layout />
    <div className="  bg-white py-5 mb-10 px-10">
      {/* Tabs */}
      <div className="flex justify-around border-b border-gray-300 mb-4">
        <button
          onClick={() => setTab('Service')}
          className={`py-2 px-4 ${
            tab === 'Service'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-500'
          }`}
        >
          Service Design
        </button>
        <button
          onClick={() => setTab('Customer')}
          className={`py-2 px-4 ${
            tab === 'Customer'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-500'
          }`}
        >
          Customer Design
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 pt-5  gap-4">
        {loading ? (
          <div className="col-span-full flex justify-center items-center">
            <div className="loader"></div> {/* Use Tailwind Spinner or add a custom loader */}
          </div>
        ) : tab === 'Service' ? (
          designs.map((item, index) => (
            <div
              key={index}
              className="relative bg-gray-100 rounded-lg shadow-md overflow-hidden group"
            //   onClick={() => handleOrder(item)}
            >
              <Image
                src={item.image} // Use actual image URLs
                alt={item.categoryName}
                width={500}
                height={300}
                className="w-full h-48 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute bottom-0 w-full bg-black bg-opacity-50 p-4 text-white text-center">
                <h3 className="text-lg font-bold">{item.categoryName}</h3>
              </div>
            </div>
          ))
        ) : (
          customerDesigns.map((item, index) => (
            <div
              key={index}
              className="relative bg-gray-100 rounded-lg shadow-md overflow-hidden group"
              onClick={() => handleOrder(item)}
            >
              <Image
                src={item.image} // Use actual image URLs
                alt={item.categoryName}
                width={500}
                height={300}
                className="w-full h-48 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute bottom-0 w-full bg-black bg-opacity-50 p-4 text-white text-center">
                <h3 className="text-lg font-bold">{item.categoryName}</h3>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default MyDesign;
