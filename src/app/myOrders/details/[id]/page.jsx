"use client";
import Footer from "@/app/components/website/Footer";
import Layout from "@/app/components/website/HeaderLayout";
import React, { useState, useEffect } from "react";
import http_request from "../../../../../http-request"; // Ensure this is the correct path
import { useParams } from "next/navigation";
import { FaArrowDown } from 'react-icons/fa'; // Importing a down arrow icon from React Icons
import { ReactLoader } from "@/app/components/common/Loading";

const OrderTimeline = () => {
    const [orderDetails, setOrderDetails] = useState(null);
    const [timeline, setTimeline] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    // Fetch order details from the API
    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await http_request.get(`/getOrderById/${id}`);
                const { data } = response;
                setOrderDetails(data);
                setTimeline(data?.timeline);
            } catch (error) {
                console.error("Error fetching order data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderData();
    }, [id]);

   
    return (
        <>
            <Layout />
           {loading===true ?<ReactLoader /> 
             :
            <div className="p-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6">Order Timeline</h2>
                    <div className="space-y-6">
                        {timeline?.map((item, index) => (
                            <div
                                key={index}
                                className={`flex flex-col mb-6 ${index === timeline.length - 1 ? "bg-green-100 p-4 rounded-lg" : ""}`}
                            >
                                {/* Timeline Status */}
                                <div className="flex items-center space-x-4">
                                    <div
                                        className={`w-6 h-6 rounded-full ${index === timeline.length - 1 ? "bg-green-500" : "bg-gray-300"
                                            }`}
                                    ></div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {item.status}
                                            <span className="text-sm text-gray-500 ml-2">
                                                {new Date(item.date).toLocaleString()}
                                            </span>
                                        </h3>
                                    </div>
                                    {/* Arrow indicating progress */}
                                    {index < timeline.length - 1 && (
                                        <div className="flex items-center">
                                            <FaArrowDown className="text-gray-400 ml-2" />
                                        </div>
                                    )}
                                </div>

                                {/* Timeline Details */}
                                <div className="mt-2 pl-10 space-y-2 text-sm text-gray-600">
                                    {item.details.map((detail, i) => (
                                        <p key={i}>{detail}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Details */}
                    <div className="mt-10 p-6 border rounded-lg bg-gray-50">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Details</h2>
                        <div className="space-y-4">
                            {orderDetails &&
                                Object.entries(orderDetails)
                                    .filter(([key, _]) => !["image", "updatedAt", "createdAt", "razorpaySignature", "razorpayPaymentId", "timeline", "RazorpayOrderId", "__v"].includes(key)) // Filtering out specific fields
                                    .map(([key, value]) => {
                                        // Handle "timeline" as an array and render each timeline entry
                                        if (key === "timeline" && Array.isArray(value)) {
                                            return (
                                                <div key={key} className="text-sm text-gray-700">
                                                    <strong className="block mb-2">{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
                                                    <ul className="space-y-4">
                                                        {value.length === 0 ? (
                                                            <p>No timeline data available</p>
                                                        ) : (
                                                            value.map((item, index) => (
                                                                <li key={index} className="border-b pb-4">
                                                                    {/* Timeline Item */}
                                                                    <div className="flex items-center space-x-4">
                                                                        <div
                                                                            className={`w-6 h-6 rounded-full ${index === value.length - 1 ? "bg-green-500" : "bg-gray-300"
                                                                                }`}
                                                                        ></div>
                                                                        <div>
                                                                            <h3 className="text-lg font-semibold text-gray-800">
                                                                                {item.status}
                                                                                <span className="text-sm text-gray-500 ml-2">
                                                                                    {new Date(item.date).toLocaleString()}
                                                                                </span>
                                                                            </h3>
                                                                        </div>
                                                                    </div>
                                                                    <div className="pl-10 mt-2 space-y-2 text-sm text-gray-600">
                                                                        {/* Timeline Details */}
                                                                        {item.details.map((detail, i) => (
                                                                            <p key={i}>{detail}</p>
                                                                        ))}
                                                                    </div>
                                                                </li>
                                                            ))
                                                        )}
                                                    </ul>
                                                </div>
                                            );
                                        }
                                        // If it's not an object (e.g., a string, number), render it as a simple string
                                        return (
                                            <p key={key} className="text-sm text-gray-700">
                                                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                                            </p>
                                        );
                                    })}
                            <p className="text-sm text-gray-700">
                                <strong>Created At:</strong> {new Date(orderDetails.createdAt).toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-700">
                                <strong>Updated At:</strong> {new Date(orderDetails.updatedAt).toLocaleString()}
                            </p>
                        </div>
                    </div>


                </div>
            </div>
}
            <Footer />
        </>
    );
};

export default OrderTimeline;
