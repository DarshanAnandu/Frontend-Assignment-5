import React, { useState, useRef } from 'react';

interface ProductProps {
    title: string;
    images: string[];
    desc: string[];
    price: number;
    layoutType: 'default' | 'list' | 'grid';
}

const Product: React.FC<ProductProps> = ({ title, images, desc, price, layoutType }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const imageContainerRef = useRef<HTMLDivElement>(null);

    const layoutClasses = {
        default: 'w-full p-4 bg-white border-2 border-slate-200 rounded-lg flex flex-row mx-auto mb-6',
        list: 'w-full p-4 bg-white border-2 border-slate-200 rounded-lg flex flex-col mx-auto mb-6',
        grid: 'w-full p-4 bg-white border-2 border-slate-200 rounded-lg sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 hover:shadow-lg transition-transform duration-500 transform hover:scale-105',
    };

    const imageClasses = {
        default: 'w-full h-64 object-fill rounded-lg',
        list: 'w-full h-52 object-fill rounded-lg',
        grid: 'w-full h-80 object-fill rounded-lg',
    };

    const handleImageHover = () => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 1500);

        imageContainerRef.current?.addEventListener('mouseleave', () => {
            clearInterval(interval);
        });
    };

    const handleDotClick = (index: number) => {
        setCurrentImage(index);
    };

    const handleArrowClick = (direction: 'left' | 'right') => {
        if (direction === 'left') {
            setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
        } else {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }
    };

    return (
        <div className={layoutClasses[layoutType]} onMouseEnter={handleImageHover}>
            <div className={`relative ${imageClasses[layoutType]}`} ref={imageContainerRef}>
                <img
                    className="w-full h-full rounded-lg transition-transform duration-500 transform hover:scale-105"
                    src={images[currentImage]}
                    alt={title}
                />
                {images.length > 1 && (
                    <>
                        <div
                            className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-between px-4"
                            onClick={() => handleArrowClick('left')}
                        >
                            <span className="text-white text-3xl font-bold cursor-pointer">&lt;</span>
                        </div>
                        <div
                            className="absolute top-0 bottom-0 right-0 flex items-center justify-between px-4"
                            onClick={() => handleArrowClick('right')}
                        >
                            <span className="text-white text-3xl font-bold cursor-pointer">&gt;</span>
                        </div>
                        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center space-x-2">
                            {images.map((_, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleDotClick(index)}
                                    className={`h-2 w-2 rounded-full bg-gray-400 ${currentImage === index ? 'bg-gray-800' : ''
                                        } cursor-pointer`}
                                ></div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <div className="w-full p-4">
                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2">{title}</h3>
                <div className="flex flex-wrap mb-2">
                    {desc.map((e, index) => (
                        <span key={index} className="mr-2 text-gray-600">
                            {e}
                            {index < desc.length - 1 && ' • '}
                        </span>
                    ))}
                </div>
                <div className="flex items-center">
                    <h4 className="text-base md:text-lg font-bold">
                        <span className="text-gray-600">&#8377;</span>
                        {price}
                    </h4>
                </div>
                <div className="flex flex-col mt-4 space-y-2">
                    <button
                        className="text-white bg-gradient-to-r from-sky-500 to-sky-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-6 py-3 text-center transition-all duration-300 hover:shadow-lg"
                        type="button"
                    >
                        Add to Wishlist
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Product;
