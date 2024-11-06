"use client"
import { useState } from 'react';
import Image from 'next/image';
 
import Footer from '../components/website/Footer';
import Layout from '../components/website/HeaderLayout';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('Personal Info');

  const tabs = [
    { name: 'Personal Info', content: 'This is the content for Personal Info.' },
    { name: 'Orders', content: 'This is the content for Orders.' },
    { name: 'Notifications', content: 'This is the content for Notifications.' }
  ];

  return (
    <div>
      <Layout />
      <section className="max-w-4xl mb-10 mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="flex items-center space-x-4">
          <Image src="/Logo.png" alt="Profile Picture" width={80} height={80} className="rounded-full" />
          <div>
            <h2 className="text-2xl font-semibold">John Doe</h2>
            <p className="text-gray-600 dark:text-gray-400">john.doe@example.com</p>
          </div>
        </div>
        <div className="mt-6">
          {/* Tabs */}
          <nav className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`pb-2 transition-colors duration-200 ${
                  activeTab === tab.name
                    ? 'border-b-2 border-blue-500 text-blue-500'
                    : 'border-b-2 border-transparent text-gray-500 dark:text-gray-400 hover:text-blue-500'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
          {/* Content */}
          <div className="mt-4">
            <p className="text-gray-700 dark:text-gray-300">
              {tabs.find((tab) => tab.name === activeTab)?.content}
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
