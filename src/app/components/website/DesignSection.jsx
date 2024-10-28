
"use client"
import React, { useEffect, useState } from 'react';
import http_request from '../../../../http-request';
import { useRouter } from 'next/navigation';
import { ReactLoader } from '../common/Loading';

const DesignSection = () => {
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
    const orderData= { item, user };
    if (user) {
      localStorage.setItem("orderM", JSON.stringify(orderData));
      router.push("/myOrders");
    } else {
      alert("Please Login");
      router.push("/sign_in");
    }
  };

  return (
    <section id="services" className="mt-12">
      <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-orange-500 mb-4">
        Our Services
      </h3>
      {loading===true? <ReactLoader />
     : <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {designs.map((item, index) => (
          <div
            key={index}
            onClick={() => handleOrder(item)}
            className="p-4 bg-white cursor-pointer shadow-md rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
          >
            <h4 className="text-2xl font-bold mb-2">{item.name}</h4>
            <p>{item.price}</p>
          </div>
        ))}
      </div>
}
    </section>
  );
};

export default DesignSection;
