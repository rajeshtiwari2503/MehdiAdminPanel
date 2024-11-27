"use client";
import React, { useEffect, useState } from 'react';

import http_request from '../../../http-request'; // Import your HTTP request function
import { ToastMessage } from '../components/common/Toastify';
import { ReactLoader } from '../components/common/Loading';
import { Toaster } from 'react-hot-toast';
import Footer from '../components/website/Footer';
import Layout from '../components/website/HeaderLayout';
import axios from 'axios';

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
      const userInfo = localStorage.getItem("user");
      const userDataReq = JSON.parse(userInfo);
      const userD = userDataReq?.user?._id;
      setLoading(true);

      const response = await http_request.get(`/getOrderByUserId/${userD}`);
      const { data } = response
      setMyOrder(data)
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching designs:", error);
      ToastMessage("Failed to load orders. Please try again.");
    }
  };

  const userPayment = async (row) => {
    try {


      const amount = row?.item?.groupOrder === true ? 500 : +(row?.item?.price); // Convert amount to paise (INR)
      const resDatapay = {
        name: row?.user?.user?.name, customerId: row?.user?.user?._id, address: row?.user?.user?.address, email: row?.user?.user?.email, contact: row?.user?.user?.contact
        , design: row?.item?.name, designId: row?.item?._id,
        image: row?.item?.image, price: row?.item?.price, groupOrder: row?.item?.groupOrder, amount, currency: "INR"
      };
      // console.log(resDatapay);

      // Send the request to the backend to create the order
      let response = await http_request.post("/addOrder", resDatapay);
      let { data } = response;
      // console.log(data); // Check if the backend returns the correct response

      const options = {
        key: "rzp_test_RZvXA4bkG4UQnJ", // Use your Razorpay Key ID from env variable
        amount: amount, // Amount in paise
        currency: "INR",
        name: "SMEHNDI", // Your business name
        description: "Payment for order",
        image: "/Logo.png",
        order_id: data.razorpayOrderId, // Use the razorpayOrderId from backend response
        handler: async function (orderDetails) {
          // console.log(orderDetails);

          const refOrder = { razorpayPaymentId: orderDetails?.razorpay_payment_id, razorpayOrderId: orderDetails?.razorpay_order_id, razorpaySignature: orderDetails?.razorpay_signature }
          try {
            // Send payment details to backend for verification
            let verifyResponse = await axios.post("https://mehdiappbackend.onrender.com/verify-payment", refOrder
            );

            let { data } = verifyResponse;
            // console.log(data);
            // console.log(verifyResponse);

            if (data?.status === true) {
              localStorage.removeItem("orderM")
              ToastMessage(data);
              setRefresh(data);
              window.location.reload();
              // onClose(true); // Close the modal or dialog
            } else {
              ToastMessage({ status: false, msg: "Payment verification failed." });
            }
          } catch (err) {
            console.log("Payment verification error:", err);
            ToastMessage("Payment verification failed.");
          }
        },
        prefill: {
          name: row?.user?.user?.name, // Customer's name
          email: row?.user?.user?.email,
          contact: row?.user?.user?.contact,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Open Razorpay checkout
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      console.log("Payment order creation error:", err);
      ToastMessage("An error occurred while creating the payment order.");
    }
  };

  return (
    <>
      <Layout />
      <Toaster />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">My Orders</h2>
        {loading === true ? <ReactLoader /> : (
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
                    onClick={() => userPayment(order)}
                    disabled={loading}
                    className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${loading ? "cursor-not-allowed opacity-50" : ""}`}
                  >
                    {loading ? "Creating Order..." : "Create Order"}
                  </button>
                ) : (
                  <p className="text-green-500 mt-4">Order successfully created!</p>
                )}
              </div>
            ) : (
              <p> </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {myOrder.length > 0 ? myOrder.map((item, index) => (
                <div key={index} className="p-4 bg-white shadow-md rounded-lg mb-6">
                  <h3 className="text-xl font-semibold mb-2">Order Details</h3>
                  <p>Design: {item.design}</p> {/* Ensure these fields match your API response structure */}
                  <p>Price: {item.price}</p>
                </div>
              )) : (
                <p>No orders found.</p>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;
