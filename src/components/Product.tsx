// Import necessary libraries
import React, { useState, useRef } from 'react';

// Define the interface for ProductProps
interface ProductProps {
    title: string;
    images: string[];
    desc: string[];
    price: number;
    layoutType: 'default' | 'list' | 'grid';
}

// Define the Product component
const Product: React.FC<ProductProps> = ({ title, images, desc, price, layoutType }) => {
    // State to track the current image index
    const [currentImage, setCurrentImage] = useState(0);
    // Ref for the image container
    const imageContainerRef = useRef<HTMLDivElement>(null);

    // CSS classes for different layouts
    const layoutClasses = {
        default: 'w-full p-4 bg-white border-2 border-slate-200 rounded-lg flex flex-row mx-auto mb-6',
        list: 'w-full p-4 bg-white border-2 border-slate-200 rounded-lg flex flex-col mx-auto mb-6',
        grid: 'w-1/4 p-4 bg-white border-2 border-slate-200 flex flex-row rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 hover:shadow-lg transition-transform duration-500 transform hover:scale-105',
    };

    // CSS classes for different image sizes
    const imageClasses = {
        default: 'w-full h-40 sm:h-full object-cover rounded-lg',
        list: 'w-full h-52 sm:h-full object-cover rounded-lg',
        grid: 'w-full h-64 sm:h-full object-cover rounded-lg',
    };

    // Function to handle image hover and rotation
    const handleImageHover = () => {
        // Set interval to rotate images every 1.5 seconds
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 1500);

        // Clear interval on mouse leave
        imageContainerRef.current?.addEventListener('mouseleave', () => {
            clearInterval(interval);
            setCurrentImage(0);
        });
    };

    // Return the JSX for the Product component
    return (
        <div className={layoutClasses[layoutType]} onMouseEnter={handleImageHover}>
            <div className={imageClasses[layoutType]} ref={imageContainerRef}>
                <img className="w-full h-full object-cover rounded-lg transition-transform duration-500 transform hover:scale-105" src={images[currentImage]} alt={title} />
            </div>
            <div className="w-full h-full p-4 flex flex-col justify-between">
                <div>
                    <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2">{title}</h3>
                    <div className="flex flex-wrap mb-2">
                        {desc.map((e, index) => (
                            <span key={index} className="mr-2 text-gray-600">
                                {e} •
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex items-center">
                    <h4 className="text-base md:text-lg font-bold">
                        <span className="text-gray-600">&#8377;</span>
                        {price}
                    </h4>
                </div>
            </div>
            <div className="w-full h-full p-4 flex flex-col justify-between">
                <div>
                    <h6 className="text-green-500 font-semibold">Free shipping</h6>
                </div>
                <div className="flex flex-col mt-4 space-y-2">
                    <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2"
                        type="button"
                    >
                        Buy Now
                    </button>
                    <button
                        className="text-black border-2 border-sky-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
                        type="button"
                    >
                        Add to wishlist
                    </button>
                </div>
            </div>
        </div>
    );
};

// Export the Product component
export default Product;
