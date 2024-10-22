import React from 'react';
import Slider from 'react-slick';
// In your _app.js or index.js file
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: "Alice Johnson",
    feedback: "The Mehandi designs are absolutely stunning! I received so many compliments at the event.",
    image: "/Logo.png", // Add image path here
  },
  {
    name: "Bob Smith",
    feedback: "Amazing service and beautiful designs. Highly recommend for any occasion!",
    image: "/Logo.png",
  },
  {
    name: "Charlie Brown",
    feedback: "A fantastic experience from start to finish. The designs are creative and unique.",
    image: "/Logo.png",
  },
  {
    name: "Diana Prince",
    feedback: "I loved my Mehandi! It was applied perfectly, and the colors were vibrant.",
    image: "/Logo.png",
  },
];

const TestimonialSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="py-10 container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        What Our Clients Say
      </h1>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="p-4">
            <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full mb-4"
              />
              <p className="text-gray-700 italic">"{testimonial.feedback}"</p>
              <h2 className="mt-4 text-lg font-bold">{testimonial.name}</h2>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialSlider;
