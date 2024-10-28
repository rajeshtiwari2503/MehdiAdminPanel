 "use client";
import React, { useEffect, useState } from 'react';
import Header from '../components/website/Header';
import Footer from '../components/website/Footer';
import http_request from '../../../http-request'; // Import your HTTP request function
import { ToastMessage } from '../components/common/Toastify';
import { ReactLoader } from '../components/common/Loading';
import { Toaster } from 'react-hot-toast';

const MyOrders = () => {
  const [order, setOrder] = useState(null);
  const [user, setUser] = useState(null);
  const [myOrder, setMyOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOrderCreated, setIsOrderCreated] = useState(false);
  const [refresh, setRefresh] = useState(null);

  useEffect(() => {
    // Retrieve and parse order and user data from localStorage
    const storedOrder = localStorage.getItem("orderM");
    const storedUser = localStorage.getItem("user");
    if (storedOrder) setOrder(JSON.parse(storedOrder));
    if (storedUser) setUser(JSON.parse(storedUser));
    fetchDesigns();
  }, [refresh]);

  const fetchDesigns = async () => {
    try {
      const storedOrder = localStorage.getItem("orderM");
      const userOrder = JSON.parse(storedOrder);
      setLoading(true);
      const response = await http_request.get(`/getOrderByUserId/${userOrder?.user?.user?._id}`);
      const { data } = response;
      setMyOrder(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching designs:", error);
    }
  };

  const handleCreateOrder = async () => {
    if (!order) {
      alert("Order or user details are missing.");
      return;
    }

    // Map fields to match the API requirements
    const orderData = {
      name: user?.user?.name,
      customerId: user?.user?.id,
      email: user?.user?.email,
      contact: user?.user?.contact,
      address: user?.user?.address,
      agentName: "Agent Name Here",
      agentId: "Agent ID Here",
      design: order?.item?.name,
      price: order?.item?.price,
    };

    try {
      setLoading(true);
      const response = await http_request.post('/addOrder', orderData);
      const { data } = response;
      localStorage.removeItem("orderM"); 
      setRefresh(data); 
      setOrder(null);
      ToastMessage(data);
      setIsOrderCreated(true);
      setLoading(false);
    } catch (error) {
      ToastMessage(error);
      setLoading(false);
      console.error("Error creating order:", error);
      alert("Error creating order.");
    }
  };

  return (
    <>
      <Header />
      <Toaster />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">My Orders</h2>
        {loading ? <ReactLoader /> : (
          <div>
            {user && (
              <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-semibold">User Details</h3>
                <p>Name: {user?.user?.name}</p>
                <p>Email: {user?.user?.email}</p>
                <p>Contact: {user?.user?.contact}</p>
                <p>Address: {user?.user?.address}</p>
              </div>
            )}

            {order ? (
              <div className="p-4 bg-white shadow-md rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-2">Order Details</h3>
                <p>Design: {order.item?.name}</p>
                <p>Price: {order.item?.price}</p>
                {!isOrderCreated ? (
                  <button
                    onClick={handleCreateOrder}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Create Order
                  </button>
                ) : (
                  <p className="text-green-500 mt-4">Order successfully created!</p>
                )}
              </div>
            ) : (
              <p> </p>
            )}

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {myOrder.length > 0 ? myOrder.map((item, index) => (
                <div key={index} className="p-4 bg-white shadow-md rounded-lg mb-6">
                  <h3 className="text-xl font-semibold mb-2">Order Details</h3>
                  <p>Design: {item.design}</p> {/* Ensure these fields match your API response structure */}
                  <p>Price: {item.price}</p>
                </div>
              )) : (
                <p>No order details found.</p>
              )}
            </div>
          </div>
        )}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default MyOrders;
