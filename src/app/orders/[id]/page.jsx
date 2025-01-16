 "use client";

import React, { useEffect, useState } from "react";
import http_request from "../../../../http-request"; // Ensure you have Axios installed
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ReactLoader } from "@/app/components/common/Loading";
import Sidenav from "@/app/components/Sidenav";

const OrderDetails = () => {
    const router = useRouter();
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (id) {
            const fetchOrderDetails = async () => {
                try {
                    const response = await http_request.get(`/getOrderById/${id}`);
                    setOrder(response.data);
                    setLoading(false);
                } catch (err) {
                    setError("Failed to fetch order details.");
                    setLoading(false);
                }
            };
            fetchOrderDetails();
        }
    }, [id]);

    return (
        <>
            <Sidenav>
                {loading ? (
                    <div className="flex justify-center items-center h-screen">
                        <ReactLoader />
                    </div>
                ) : error ? (
                    <div className="flex justify-center items-center h-screen text-red-600">
                        {error}
                    </div>
                ) : (
                    <div className="p-8 max-w-3xl mx-auto bg-gray-50 shadow-lg rounded-lg">
                        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                            Order Details
                        </h1>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-600">Name:</span>
                                <span className="text-gray-800">{order.name}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-600">Contact:</span>
                                <span className="text-gray-800">{order.contact}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-600">Email:</span>
                                <span className="text-gray-800">{order.email}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-600">Address:</span>
                                <span className="text-gray-800">{order.address}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-600">Agent Name:</span>
                                <span className="text-gray-800">{order.agentName}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-600">Price:</span>
                                <span className="text-gray-800">{order.price}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-600"> Order Status:</span>
                                <span
                                    className={`${
                                        order.status === "Completed"
                                            ? "text-green-600"
                                            : "text-yellow-600"
                                    } font-medium`}
                                >
                                    {order.order}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-600">   Status:</span>
                                <span
                                    className={`${
                                        order.status === "Completed"
                                            ? "text-green-600"
                                            : "text-yellow-600"
                                    } font-medium`}
                                >
                                    {order.status}
                                </span>
                            </div>
                        </div>
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                Timeline
                            </h2>
                            <ul className="space-y-4">
                                {order.timeline.map((event, index) => (
                                    <li
                                        key={index}
                                        className="bg-gray-100 p-4 rounded-lg shadow-sm"
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-gray-600">
                                                {event.status}:
                                            </span>
                                            <span className="text-gray-800">
                                                {new Date(event.date).toLocaleString()}
                                            </span>
                                        </div>
                                        {event.details && (
                                            <ul className="mt-2 list-disc pl-5 text-gray-600">
                                                {event.details.map((detail, i) => (
                                                    <li key={i}>{detail}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-6 text-center">
                            <Link href="/orders">
                                <div className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg">
                                    Back to Orders
                                </div>
                            </Link>
                        </div>
                    </div>
                )}
            </Sidenav>
        </>
    );
};

export default OrderDetails;
