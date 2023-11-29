import React from 'react';

interface ProductProps {
    title: string;
    image: string;
    desc: string[];
    Price: number;
    // stars: number[];
}

const Product: React.FC<ProductProps> = ({
    title,
    image,
    desc,
    Price,
    // stars,
}) => {
    return (
        <div className="w-full h-auto p-2 bg-white-200 border-2 border-slate-200 rounded-lg flex flex-row mx-auto mb-6">
            <div className="w-3/12 h-full">
                <img className="pl-4 pt-2 w-72 h-full" src={image} alt="img" />
            </div>
            <div className="w-6/12 h-full p-2 ">
                <h3 className="pl-4 pt-2 text-2xl">{title}</h3>
                {/* <div className="px-4">
                    {stars.map((_, index) => (
                        <i key={index} className="fa fa-star" style={{ color: 'green' }}></i>
                    ))}
                </div> */}
                <div className="px-4">
                    {desc.map((e, index) => (
                        <span key={index}>{e} •</span>
                    ))}
                </div>
            </div>
            <div className="w-3/12 h-full border-l-4 p-2">
                <div className="flex flex-row items-center ">
                    <h4 className="text-lg">
                        <span>&#8377;</span>
                        {Price}
                    </h4>
                </div>
                <h6 className="text-success">Free shipping</h6>
                <div className="flex flex-col mt-4">
                    <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        type="button"
                    >
                        Buy Now
                    </button>
                    <button
                        className="text-black border-2 border-sky-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                        type="button"
                    >
                        Add to wishlist
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Product;
