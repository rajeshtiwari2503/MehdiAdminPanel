"use client"
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import http_request from '../../../http-request';
import Layout from "../components/website/HeaderLayout";
import Footer from "../components/website/Footer";
import { useRouter } from "next/navigation";

const GroupOrder = () => {
    const [designs, setDesigns] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [openTitle, setOpenTitle] = useState(false);
    const [selectedDesign, setSelectedDesign] = useState(null);
    const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const router =useRouter();
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            numberOfPeople: "5",
            selectedDate: "",
            selectedTime: "",
            contact: "",
            alternateNo: "",
            address: "",
            bridalMehndi: false,
        },
    });

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        
        }
        const fetchDesigns = async () => {
            try {
                setLoading(true);
                const response = await http_request.get("/getAllMehndiDesign"); // Update API route
                const filteredDesigns = response.data?.filter(
                    (design) => design.groupOrder === true
                );
                setDesigns(filteredDesigns);
            } catch (error) {
                console.error("Error fetching designs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDesigns();
    }, []);

    const openModal = ( ) => {
        // setSelectedDesign(design);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedDesign(null);
        reset();
    };
    const handleClick = (design) => {
        setValue("contact",user?.user?.contact)
        setValue("address",user?.user?.address)
        setSelectedDesign(design);
        setOpenTitle(true)
        // console.log(design);
        
    }
    const onSubmit = async (data) => {
        try {
       
            const orderData={item:{...data,...selectedDesign}, user}
             
            
            // setLoading(true);
            // const orderData = { ...data, designId: selectedDesign?._id || "" };
            // await http_request.post("/addOrder", orderData); // Update API route
            // alert("Order Confirmed: Your order has been placed successfully.");
            localStorage.setItem("orderM", JSON.stringify(orderData));
            router.push("/myOrders");
            closeModal();
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Order Failed: Please try again later.");
        } finally {
            setLoading(false);
        }
       
    };
   
     
    const items = [
        { name: 'Simple Bunch', price: '150 Rs.' },
        { name: 'Heavy Mandala', price: '200-250 Rs.' },
        { name: 'Simple Party Mehndi', price: '200 Rs.' },
        { name: 'Heavy Party Mehndi', price: '200-400 Rs.' },
        { name: 'Simple Feet Mehndi', price: '200 Rs.' },
        { name: 'Party Feet Mehndi', price: '250-500 Rs.' },
        { name: 'Bridal Mehndi', price: '1500-4000 Rs.' },
        { name: 'Bridal Feet Mehndi', price: '1000-2000 Rs.' },
        { name: 'Complete Bridal', price: '2500-7000 Rs.' },
    ];
    // console.log(selectedDesign);
    
    return (
        <>
            <Layout />

            <div className="  bg-white px-10 pt-8 ">
                <h1 className="text-2xl font-bold text-center mb-6">Group Order</h1>
                {loading ? (
                    <div className="flex justify-center items-center">
                        <div className="loader">Loading...</div>
                    </div>
                ) : (
                   <>
                {openTitle === true ? <div className="p-6  bg-gray-50 min-h-screen">
                    <h2 className="text-2xl font-bold text-center mb-6">Mehndi Price List</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {items.map((item, index) => (
                            <li
                                key={index}
                                className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
                            >
                                <span className="text-lg font-medium">{item.name}</span>
                                <span className="text-blue-600 font-semibold">{item.price}</span>
                            </li>
                        ))}
                    </ul>
                    <button
                       onClick={()=>openModal( )}
                        className="bg-blue-500 mt-8 mb-5 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
                    >
                        Proceed Order
                    </button>
                </div>
                    : 
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pb-10">
                    {designs.map((design, index) => (
                        <div
                            key={index}
                            className="relative group bg-gradient-to-r from-gray-100 via-white to-gray-100 shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 cursor-pointer"
                            onClick={() => handleClick(design)}
                        >
                            <Image
                                src={design.image}
                                alt={design.name}
                                width={300}
                                height={200}
                                className="w-full h-40 object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                                <p className="text-white text-lg font-semibold">{design.name}</p>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800 truncate">
                                    {design.name}
                                </h3>
                                {/* <p className="text-sm text-gray-600 mt-1">
            {design.description || "Explore this design for your group order."}
          </p> */}
                            </div>
                        </div>
                    ))}
                </div>
                }
                </>
            )}

                {modalVisible && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white rounded-lg p-4  w-full max-w-lg">
                            <h2 className="text-xl font-bold pt-2  ">{selectedDesign?.name}</h2>
                            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-2">
                                {/* Number of People */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Number of People</label>
                                    <Controller
                                        name="numberOfPeople"
                                        control={control}
                                        render={({ field }) => (
                                            <select
                                                {...field}
                                                className="w-full p-2 border-gray-500 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                {[...Array(96).keys()].map((i) => (
                                                    <option key={i} value={i + 5}>
                                                        {i + 5}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    />
                                </div>

                                {/* Select Date */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Select Date</label>
                                    <Controller
                                        name="selectedDate"
                                        control={control}
                                        rules={{ required: "Date is required" }}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                type="date"
                                                className={`w-full px-3 p-1 border ${errors.selectedDate ? "border-red-500" : "border-gray-300"
                                                    } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                                            />
                                        )}
                                    />
                                    {errors.selectedDate && (
                                        <p className="text-red-500 text-sm">{errors.selectedDate.message}</p>
                                    )}
                                </div>

                                {/* Select Time */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Select Time</label>
                                    <Controller
                                        name="selectedTime"
                                        control={control}
                                        rules={{ required: "Time is required" }}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                type="time"
                                                className={`w-full px-3 p-1 border ${errors.selectedTime ? "border-red-500" : "border-gray-300"
                                                    } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                                            />
                                        )}
                                    />
                                    {errors.selectedTime && (
                                        <p className="text-red-500 text-sm">{errors.selectedTime.message}</p>
                                    )}
                                </div>

                                {/* Contact Number */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Contact Number</label>
                                    <Controller
                                        name="contact"
                                        control={control}
                                        rules={{ required: "Contact number is required" }}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                type="tel"
                                                placeholder="Enter your contact number"
                                                className={`w-full px-3 p-1 border ${errors.contact ? "border-red-500" : "border-gray-300"
                                                    } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                                            />
                                        )}
                                    />
                                    {errors.contact && (
                                        <p className="text-red-500 text-sm">{errors.contact.message}</p>
                                    )}
                                </div>

                                {/* Alternate Contact Number */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Alternate Contact Number</label>
                                    <Controller
                                        name="alternateNo"
                                        control={control}
                                        rules={{
                                            pattern: {
                                                value: /^[0-9]{10}$/,
                                                message: "Please enter a valid 10-digit contact number",
                                            },
                                        }}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                type="tel"
                                                placeholder="Enter alternate contact number"
                                                className={`w-full px-3 p-1 border ${errors.alternateNo ? "border-red-500" : "border-gray-300"
                                                    } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                                            />
                                        )}
                                    />
                                    {errors.alternateNo && (
                                        <p className="text-red-500 text-sm">{errors.alternateNo.message}</p>
                                    )}
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Address</label>
                                    <Controller
                                        name="address"
                                        control={control}
                                        rules={{ required: "Address is required" }}
                                        render={({ field }) => (
                                            <textarea
                                                {...field}
                                                placeholder="Enter your address"
                                                className={`w-full px-3 border ${errors.address ? "border-red-500" : "border-gray-300"
                                                    } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                                            />
                                        )}
                                    />
                                    {errors.address && (
                                        <p className="text-red-500 text-sm">{errors.address.message}</p>
                                    )}
                                </div>

                                {/* Bridal Mehndi */}
                                <div className="flex items-center">
                                    <Controller
                                        name="bridalMehndi"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                type="checkbox"
                                                checked={field.value}
                                                onChange={(e) => field.onChange(e.target.checked)}
                                                className="mr-2"
                                            />
                                        )}
                                    />
                                    <label className="text-sm">Bridal Mehndi</label>
                                </div>

                                {/* Buttons */}
                                <div className="flex justify-between">
                                    <button
                                        type="submit"
                                        // onClick={()=>handleOrder()}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
                                    >
                                        Place Order
                                    </button>
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default GroupOrder;

