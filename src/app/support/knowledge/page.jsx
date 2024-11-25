import Sidenav from '@/app/components/Sidenav'
import Layout from '@/app/components/website/HeaderLayout'
import Link from 'next/link'
import React from 'react'

const Knowledge = (props) => {
    return (
        <>
            {props?.isAdmin === false ?
                <>

                    <div className="p-6 bg-gray-100 min-h-screen">
                        <h1 className="text-4xl font-bold mb-4">Knowledge Page</h1>
                        <div className="bg-white p-6 rounded shadow-md">
                            <h2 className="text-2xl font-semibold mb-4">
                                Welcome to SMehndi.com Knowledge Hub
                            </h2>
                            <p className="text-lg mb-4">
                                At SMehndi.com, we are dedicated to bringing you the best insights and
                                knowledge about Mehndi art, traditions, and techniques. Explore our
                                hub to learn more about this timeless craft and enhance your skills
                                with our expert tips and resources.
                            </p>

                            <h3 className="text-xl font-semibold mb-2">Our Expertise</h3>
                            <ul className="list-disc list-inside mb-4">
                                <li>Comprehensive guides to Mehndi designs</li>
                                <li>Traditional and modern Mehndi techniques</li>
                                <li>Insights into Mehndi culture and history</li>
                                <li>Tips for perfecting your Mehndi art</li>
                            </ul>

                            <h3 className="text-xl font-semibold mb-2">
                                Latest Articles and Insights
                            </h3>
                            <p className="text-lg mb-4">
                                Discover the latest trends, articles, and tips from our Mehndi
                                experts. Stay inspired and elevate your Mehndi artistry with curated
                                content just for you.
                            </p>
                            <ul className="list-disc list-inside mb-4">
                                <li>
                                    <a href="#" className="text-blue-500 hover:underline">
                                        Top Mehndi Trends for 2024
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-blue-500 hover:underline">
                                        Step-by-Step Guide to Bridal Mehndi Designs
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-blue-500 hover:underline">
                                        Modern Mehndi Techniques for Beginners
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-blue-500 hover:underline">
                                        The Cultural Significance of Mehndi in Weddings
                                    </a>
                                </li>
                            </ul>

                            <h3 className="text-xl font-semibold mb-2">Contact Our Experts</h3>
                            <p className="text-lg mb-4">
                                Need assistance or have questions? Our team of Mehndi experts is here
                                to help.{" "}
                                <Link href="/contact" className="text-blue-500 hover:underline">
                                    Contact us
                                </Link>{" "}
                                for more information or inquiries.
                            </p>
                        </div>
                    </div>


                </>

                : <Sidenav>
                    <div className="p-6 bg-gray-100 min-h-screen">
                        <h1 className="text-4xl font-bold mb-4">Knowledge Page</h1>
                        <div className="bg-white p-6 rounded shadow-md">
                            <h2 className="text-2xl font-semibold mb-4">
                                Welcome to SMehndi.com Knowledge Hub
                            </h2>
                            <p className="text-lg mb-4">
                                At SMehndi.com, we are dedicated to bringing you the best insights and
                                knowledge about Mehndi art, traditions, and techniques. Explore our
                                hub to learn more about this timeless craft and enhance your skills
                                with our expert tips and resources.
                            </p>

                            <h3 className="text-xl font-semibold mb-2">Our Expertise</h3>
                            <ul className="list-disc list-inside mb-4">
                                <li>Comprehensive guides to Mehndi designs</li>
                                <li>Traditional and modern Mehndi techniques</li>
                                <li>Insights into Mehndi culture and history</li>
                                <li>Tips for perfecting your Mehndi art</li>
                            </ul>

                            <h3 className="text-xl font-semibold mb-2">
                                Latest Articles and Insights
                            </h3>
                            <p className="text-lg mb-4">
                                Discover the latest trends, articles, and tips from our Mehndi
                                experts. Stay inspired and elevate your Mehndi artistry with curated
                                content just for you.
                            </p>
                            <ul className="list-disc list-inside mb-4">
                                <li>
                                    <a href="#" className="text-blue-500 hover:underline">
                                        Top Mehndi Trends for 2024
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-blue-500 hover:underline">
                                        Step-by-Step Guide to Bridal Mehndi Designs
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-blue-500 hover:underline">
                                        Modern Mehndi Techniques for Beginners
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-blue-500 hover:underline">
                                        The Cultural Significance of Mehndi in Weddings
                                    </a>
                                </li>
                            </ul>

                            <h3 className="text-xl font-semibold mb-2">Contact Our Experts</h3>
                            <p className="text-lg mb-4">
                                Need assistance or have questions? Our team of Mehndi experts is here
                                to help.{" "}
                                <Link href="/contact" className="text-blue-500 hover:underline">
                                    Contact us
                                </Link>{" "}
                                for more information or inquiries.
                            </p>
                        </div>
                    </div>
                </Sidenav>
            }
        </>

    )
}

export default Knowledge