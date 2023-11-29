import React, { useState, useEffect } from 'react';
import Data from './Data';

const SideFilter = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 0 });
  const [selectedRating, setSelectedRating] = useState<number>(0);

  useEffect(() => {
    // Extract categories, brands, and price range from the data
    const uniqueCategories = [...new Set(Data[0].products.map((product) => product.category))];
    const uniqueBrands = [...new Set(Data[0].products.map((product) => product.brand))];
    const minPrice = Math.min(...Data[0].products.map((product) => product.price));
    const maxPrice = Math.max(...Data[0].products.map((product) => product.price));

    setCategories(uniqueCategories);
    setBrands(uniqueBrands);
    setPriceRange({ min: minPrice, max: maxPrice });
  }, []);

  const handleBrandChange = (brand: string) => {
    // Handle brand selection logic
    console.log('Selected Brand:', brand);
  };

  const handlePriceChange = (min: number, max: number) => {
    // Handle price range change logic
    console.log('Selected Price Range:', { min, max });
  };

  const handleRatingChange = (rating: number) => {
    // Handle rating selection logic
    console.log('Selected Rating:', rating);
    setSelectedRating(rating);
  };

  return (
    <div className='h-screen w-full sticky top-20 bg-orange-300'>
      <span>Filters</span> {/* if any filters selected the select filter should appear on the top of the filter with x(cancel symbol to cancel that filter) */}

      <div>
        <span>Category</span>
        <ul>
          {categories.map((category, index) => (
            <li key={index}>{category}</li>
          ))}
        </ul>
      </div>

      <div>
        <span>Brand</span>
        <input
          type='text'
          placeholder='Search Brand'
          onChange={(e) => handleBrandChange(e.target.value)}
        />
        <ul>
          {brands.map((brand, index) => (
            <li key={index}>
              <label>
                <input type='checkbox' onChange={() => handleBrandChange(brand)} />
                {brand}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <span>Price</span>
        <input
          type='range'
          min={priceRange.min}
          max={priceRange.max}
          onChange={(e) => handlePriceChange(priceRange.min, parseInt(e.target.value))}
        />
        <span>
          {priceRange.min} - {priceRange.max}
        </span>
      </div>

      <div>
        <span>Rating</span>
        {[5, 4, 3, 2, 1].map((stars) => (
          <div key={stars} onClick={() => handleRatingChange(stars)}>
            {[...Array(stars)].map((_, index) => (
              <span key={index}>&#x2605;</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideFilter;
