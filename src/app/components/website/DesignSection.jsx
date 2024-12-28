
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
    console.log(item);
    
    if (user) {
     
        // localStorage.setItem("orderM", JSON.stringify(orderData));
        router.push(item);
      
    } else {
      alert("Please Login");
      router.push("/sign_in");
    }
  };

  const cards = [
    {
      title: 'Group Order',
      description: 'Collaborate with your team to place orders efficiently.',
      icon: '👥',
      link:"groupOrder"
      
    },
    {
      title: 'Order Online',
      description: 'Place single or bulk orders seamlessly.',
      icon: '🛒',
      link:"designs"

    },
    {
      title: 'Design',
      description: 'Customize your order with unique designs.',
      icon: '🎨',
      link:"userDesign"

    },
  ];
  return (
    <section id="services" className="mt-12">
  <h3 className="text-3xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-orange-500 mb-8">
    Our Services
  </h3>

  <div className="container mx-auto px-4">
    {/* Responsive Grid Layout */}
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {cards.map((card, index) => (
        <div
          key={index}
          onClick={() => handleOrder(card?.link)}
          className="bg-white cursor-pointer shadow-lg rounded-lg p-6 transition transform hover:scale-105 hover:shadow-xl hover:bg-gray-50"
        >
          {/* Icon */}
          <div className="text-4xl mb-4 text-blue-500">
            {card.icon}
          </div>

          {/* Title */}
          <h3 className="md:text-xl text-sm font-bold text-gray-800">{card.title}</h3>

          {/* Description (if needed) */}
          {/* <p className="text-gray-600 mt-2">{card.description}</p> */}
          
          {/* Optional button */}
          {/* <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Learn More
          </button> */}
        </div>
      ))}
    </div>
  </div>
</section>

  );
};

export default DesignSection;
