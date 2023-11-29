import React, { useState } from 'react';

const Sort = () => {
    const [selectedOption, setSelectedOption] = useState('relevance');

    const options = [
        { value: 'relevance', label: 'Relevance' },
        { value: 'lowToHigh', label: 'Price: Low to High' },
        { value: 'highToLow', label: 'Price: High to Low' },
        { value: 'Ratings', label: 'Ratings' },
    ];

    const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedOption(e.target.value);
    };

    return (
        <div className="flex items-center space-x-4 my-4">
            <label className="text-gray-600">Sort by:</label>
            <select
                className="border rounded-md py-1 px-2 bg-white text-gray-700"
                value={selectedOption}
                onChange={handleChange}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Sort;



// import React from 'react';

// const Sort = () => {
//     return (
//         <div className="flex items-center space-x-4 my-4">
//             <label className="text-gray-600">Sort by:</label>
//             <select
//                 className="border rounded-md py-1 px-2 bg-white text-gray-700"
//                 defaultValue="relevance"
//             >
//                 <option value="relevance">Relevance</option>
//                 <option value="lowToHigh">Price: Low to High</option>
//                 <option value="highToLow">Price: High to Low</option>
//                 <option value="customerRatings">Customer Ratings</option>
//             </select>
//         </div>
//     );
// };

// export default Sort;
