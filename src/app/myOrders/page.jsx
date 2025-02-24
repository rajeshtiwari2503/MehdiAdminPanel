"use client";
import React, { useEffect, useState } from 'react';

import http_request from '../../../http-request'; // Import your HTTP request function
import { ToastMessage } from '../components/common/Toastify';
import { ReactLoader } from '../components/common/Loading';
import { Toaster } from 'react-hot-toast';
import Footer from '../components/website/Footer';
import Layout from '../components/website/HeaderLayout';
import axios from 'axios';
import Link from 'next/link';
import { FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
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

  //   const userPayment = async (row) => {
  //     try {


  //       const amount = row?.item?.groupOrder === true ? 500 : +(row?.item?.price); // Convert amount to paise (INR)
  //       const resDatapay = {
  //         name: row?.user?.user?.name, customerId: row?.user?.user?._id, address: row?.user?.user?.address, email: row?.user?.user?.email, contact: row?.user?.user?.contact
  //         , design: row?.item?.name, designId: row?.item?._id,
  //         image: row?.item?.image, price: row?.item?.price, groupOrder: row?.item?.groupOrder, amount, currency: "INR"
  //       };
  //       console.log(resDatapay);

  //       // Send the request to the backend to create the order
  //       let response = await http_request.post("/addOrder", resDatapay);
  //       let { data } = response;
  //       // console.log(data); // Check if the backend returns the correct response

  //       const options = {
  //         key: "rzp_test_RZvXA4bkG4UQnJ", // Use your Razorpay Key ID from env variable
  //         amount: amount, // Amount in paise
  //         currency: "INR",
  //         name: "SMEHNDI", // Your business name
  //         description: "Payment for order",
  //         image: "/Logo.png",
  //         order_id: data.razorpayOrderId, // Use the razorpayOrderId from backend response
  //         handler: async function (orderDetails) {
  //           // console.log(orderDetails);

  //           const refOrder = { razorpayPaymentId: orderDetails?.razorpay_payment_id, razorpayOrderId: orderDetails?.razorpay_order_id, razorpaySignature: orderDetails?.razorpay_signature }
  //           console.log(refOrder);

  //           try {
  //             // Send payment details to backend for verification
  //             let verifyResponse = await axios.post("https://mehdiappbackend.onrender.com/verify-payment", refOrder
  //             );

  //             let { data } = verifyResponse;
  //             console.log(data);
  //             // console.log(verifyResponse);

  //             if (data?.status === true) {
  //               localStorage.removeItem("orderM")
  //               ToastMessage(data);
  //               setRefresh(data);
  //               window.location.reload();
  //               // onClose(true); // Close the modal or dialog
  //             } else {
  //               ToastMessage({ status: false, msg: "Payment verification failed." });
  //             }
  //           } catch (err) {
  //             console.log("Payment verification error:", err);
  //             ToastMessage({ status: false, msg: "Payment verification failed." });
  //           }
  //         },
  //         prefill: {
  //           name: row?.user?.user?.name, // Customer's name
  //           email: row?.user?.user?.email,
  //           contact: row?.user?.user?.contact,
  //         },
  //         notes: {
  //           address: "Razorpay Corporate Office",
  //         },
  //         theme: {
  //           color: "#3399cc",
  //         },
  //       };
  // // console.log(options);

  //       // Open Razorpay checkout
  //       const rzp1 = new window.Razorpay(options);
  //       rzp1.open();
  //     } catch (err) {
  //       console.log("Payment order creation error:", err);
  //       ToastMessage({ status: false, msg: "An error occurred while creating the payment order."});
  //     }
  //   };
  const loadRazorpaySDK = () => {
    return new Promise((resolve, reject) => {
      if (typeof window.Razorpay !== 'undefined') {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject('Failed to load Razorpay SDK');
      document.body.appendChild(script);
    });
  };

  const userPayment = async (row) => {
    try {
      // Ensure Razorpay SDK is loaded
      await loadRazorpaySDK();

      const amount = row?.item?.groupOrder === true ? 500 : +(row?.item?.price); // Convert amount to paise (INR)
      const resDatapay = {
        name: row?.user?.user?.name,
        customerId: row?.user?.user?._id,
        address: row?.user?.user?.address,
        email: row?.user?.user?.email,
        contact: row?.user?.user?.contact,
        design: row?.item?.name,
        designId: row?.item?._id,
        image: row?.item?.image,
        price: row?.item?.price,
        groupOrder: row?.item?.groupOrder,
        amount,
        currency: "INR",
      };

      // Send the request to the backend to create the order
      let response = await http_request.post("/addOrder", resDatapay);
      let { data } = response;

      const options = {
        key: "rzp_test_RZvXA4bkG4UQnJ", // Use your Razorpay Key ID
        amount: amount, // Amount in paise
        currency: "INR",
        name: "SMEHNDI",
        description: "Payment for order",
        image: "/Logo.png",
        order_id: data.razorpayOrderId,
        handler: async function (orderDetails) {
          const refOrder = {
            razorpayPaymentId: orderDetails?.razorpay_payment_id,
            razorpayOrderId: orderDetails?.razorpay_order_id,
            razorpaySignature: orderDetails?.razorpay_signature,
          };

          try {
            let verifyResponse = await axios.post("https://mehdiappbackend.onrender.com/verify-payment", refOrder);
            let { data } = verifyResponse;

            if (data?.status === true) {
              localStorage.removeItem("orderM");
              ToastMessage(data);
              setRefresh(data);
              window.location.reload();
            } else {
              ToastMessage({ status: false, msg: "Payment verification failed." });
            }
          } catch (err) {
            console.log("Payment verification error:", err);
            ToastMessage({ status: false, msg: "Payment verification failed." });
          }
        },
        prefill: {
          name: row?.user?.user?.name,
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

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      console.error("Payment process error:", err);
      ToastMessage({
        status: false,
        msg: err === "Failed to load Razorpay SDK"
          ? "Razorpay SDK not loaded. Please refresh the page and try again."
          : "An error occurred while processing the payment.",
      });
    }
  };
  const [fullScreenImage, setFullScreenImage] = useState(null);

  return (
    <>
      <Layout />
      <Toaster />
      <div className="p-6">
  <h2 className="text-2xl font-bold mb-4">My Orders</h2>
  {loading === true ? (
    <ReactLoader />
  ) : (
    <div>
      {/* User Details Section */}
      {user && (
        <div className="mb-4 p-6 bg-gray-50 shadow-sm rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">User Details</h3>
          <p className="text-gray-600">Name: {user?.user?.name}</p>
          <p className="text-gray-600">Email: {user?.user?.email}</p>
          <p className="text-gray-600">Contact: {user?.user?.contact}</p>
          <p className="text-gray-600">Address: {user?.user?.address}</p>
        </div>
      )}

      {/* Order Section */}
      {order ? (
        // <div className="p-6 bg-white shadow-md rounded-lg flex flex-col md:flex-row justify-between items-center mb-6">
         
        //   <div className="md:w-1/2">
        //     <h3 className="text-xl font-semibold mb-4 text-gray-800">Order Details</h3>
        //     <p className="text-gray-700">Design: {order?.item?.name}</p>
        //     <p className="text-gray-700">
        //       Original Price: 
        //       <span className="line-through text-gray-500 ml-1">${order?.item?.price}</span>
        //     </p>
        //     <p className="text-gray-700">
        //       Discounted Price: 
        //       <span className="text-green-600 ml-1">
        //         ${((order?.item?.price * 0.75) || 0).toFixed(2)}
        //       </span>
        //     </p>
        //     <p className="text-gray-700">
        //       Group Order: {order?.item?.groupOrder === true ? "YES" : "NO"}
        //     </p>
        //     {!isOrderCreated ? (
        //       <button
        //         onClick={() => userPayment(order)}
        //         disabled={loading}
        //         className={`mt-4 px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition duration-300 ${
        //           loading ? "cursor-not-allowed opacity-50" : ""
        //         }`}
        //       >
        //         {loading ? "Creating Order..." : "Create Order"}
        //       </button>
        //     ) : (
        //       <p className="text-green-600 mt-4">Order successfully created!</p>
        //     )}
        //   </div>
          
        //   <div className="md:w-1/2 flex justify-center md:justify-end">
        //     <img
        //       src={order?.item?.image}
        //       alt={order?.item?.design}
        //       className="w-40 md:w-60 h-40 md:h-60 object-cover rounded shadow-lg"
        //     />
        //   </div>
        // </div>
        <div className="p-3 bg-gray-100 min-h-screen">
    
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
        src={order?.item?.image || "https://via.placeholder.com/800x400"}
        alt={order?.item?.name}
        className="w-full h-[200px] object-cover rounded-lg shadow-md cursor-pointer"
        onClick={() => setFullScreenImage(order?.item?.image)}
      />

      {/* Full-Screen Modal */}
      {fullScreenImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={() => setFullScreenImage(null)}
        >
          <img
            src={fullScreenImage}
            alt="Full-Screen Preview"
            className="max-w-full max-h-full rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
       
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-6 p-3">
       
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">{order?.item?.name || "Product Name"}</h2>
            <div className="flex items-center space-x-1">
              <FaStar className="text-yellow-500" />
              <span className="text-gray-700 font-medium">4.6</span>
              <span className="text-gray-500 text-sm">(456 Reviews)</span>
            </div>
          </div>
    
          <p className="text-gray-600 mt-2">
            Exclusive design  {order?.item?.description}. Limited stock only!
          </p>
    
          
          <div className="mt-4 bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">
                ₹{((order?.item?.price * 0.75) || 0).toFixed(2)}
              </span>
              <span className="text-gray-500 line-through ml-2">₹{order?.item?.price}</span>
              <span className="text-green-600 ml-2 text-sm"> </span>
            </div>
            {/* <p className="text-sm text-gray-500">+ ₹178 taxes & fees</p> */}
          </div>
    
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <p>✅ Exclusive Pre-Order Access</p>
            <p>✅ Free Shipping Included</p>
            <p>✅ Group Order Available: {order?.item?.groupOrder ? "YES" : "NO"}</p>
            {/* <p>✅ Pay at Delivery Option Available</p> */}
          </div>
    
          
          {!isOrderCreated ? (
            <button
              onClick={() => userPayment(order)}
              disabled={loading}
              className={`mt-6 w-full p-2 rounded-lg bg-gradient-to-r from-red-700 via-yellow-600 to-yellow-400 transition-all duration-300 group hover:from-yellow-400 hover:via-yellow-600 hover:to-red-700 ${
                loading ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              {loading ? "Processing Order..." : "Confirm Order"}
            </button>
          ) : (
            <p className="text-green-600 mt-6 text-center">🎉 Order Successfully Placed!</p>
          )}
        </div>
      </div>
      ) : (
        <p> </p>
      )}

      {/* My Orders Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {myOrder.length > 0 ? (
          myOrder.map((item, index) => (
            <Link
              key={index}
              href={`/myOrders/details/${item._id}`}
              passHref
              className="block bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300"
            >
              <div className="flex flex-col md:flex-row justify-between items-center">
                {/* Left Content Section */}
                <div className="md:w-1/2">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Order Details</h3>
                  <p className="text-gray-600">Design: {item.design}</p>
                  <p className="text-gray-600">
                    Original Price: 
                    <span className="line-through text-gray-500 ml-1">${item.price}</span>
                  </p>
                  <p className="text-gray-600">
                    Discounted Price: 
                    <span className="text-green-600 ml-1">
                      ${(item.price * 0.75).toFixed(2)}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    Group Order: {item.groupOrder === true ? "YES" : "NO"}
                  </p>
                </div>
                {/* Right Image Section */}
                <div className="md:w-1/2 flex justify-center md:justify-end">
                  <img
                    src={item.image}
                    alt={item.design}
                    className="w-40 h-40 object-cover rounded shadow-md"
                  />
                </div>
              </div>
              <div className="text-center mt-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                  View Details
                </button>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">No orders found.</p>
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
