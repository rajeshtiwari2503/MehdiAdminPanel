"use client"
import { useState } from "react";
import Contact from "../support/contact/page";
import Knowledge from "../support/knowledge/page";
import Chat from "../support/chat/page";
import Layout from "../components/website/HeaderLayout";
import Footer from "../components/website/Footer";
 

export default function Supports() {
  const [currentSection, setCurrentSection] = useState("Contact");

  const renderSection = () => {
    switch (currentSection) {
      case "Contact":
        return <Contact isAdmin={false}/>;
      case "Knowledge":
        return <Knowledge isAdmin={false}/>;
      case "Chat":
        return <Chat isAdmin={false}/>;
      default:
        return (
          <p className="text-lg text-center">Please select a section</p>
        );
    }
  };
// console.log(currentSection);

  return (
    <>
   <Layout />
    <div className="flex flex-col items-center bg-white p-5 rounded-lg shadow-lg">
      {/* <div className="flex justify-center items-center mt-4">
        <h1 className="text-2xl font-bold bg-black text-white px-4 py-2 rounded-md">
          Supports
        </h1>
      </div> */}
      <div className="flex justify-around w-full mt-4">
        <button
          className={`px-5 py-2 rounded-md text-white font-bold ${
            currentSection === "Contact"
              ? "bg-blue-500"
              : "bg-gray-400 hover:bg-gray-500"
          }`}
          onClick={() => setCurrentSection("Contact")}
        >
          Contact
        </button>
        <button
          className={`px-5 py-2 rounded-md text-white font-bold ${
            currentSection === "Knowledge"
              ? "bg-blue-500"
              : "bg-gray-400 hover:bg-gray-500"
          }`}
          onClick={() => setCurrentSection("Knowledge")}
        >
          Knowledge
        </button>
        <button
          className={`px-5 py-2 rounded-md text-white font-bold ${
            currentSection === "Chat"
              ? "bg-blue-500"
              : "bg-gray-400 hover:bg-gray-500"
          }`}
          onClick={() => setCurrentSection("Chat")}
        >
          Chat
        </button>
      </div>
      <div className="flex-1 mt-6  w-full">{renderSection()}</div>
    </div>
    <Footer />
    </>
  );
}
