import Image from 'next/image'; // Next.js optimized image component
import { useState } from 'react';

const Gallery = () => {
  // Example Mehandi design images
  const galleryImages = [
    '/Logo.png',
    '/Logo.png',
    '/Logo.png',
    '/Logo.png',
    '/Logo.png',
    '/Logo.png',
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image); // Set clicked image to show in modal
  };

  const closeModal = () => {
    setSelectedImage(null); // Close the modal
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Mehandi Design Gallery
      </h1>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {galleryImages.map((image, index) => (
          <div key={index} className="relative group">
            <Image
              src={image}
              alt={`Mehandi design ${index + 1}`}
              width={500}
              height={500}
              className="w-full h-64 object-cover rounded-lg shadow-lg cursor-pointer"
              onClick={() => handleImageClick(image)}
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition-opacity">
              <p className="text-white text-lg">View Design</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal for clicked image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="relative">
            <Image
              src={selectedImage}
              alt="Selected Mehandi design"
              width={800}
              height={800}
              className="w-full h-auto max-h-screen object-cover rounded-lg"
            />
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
