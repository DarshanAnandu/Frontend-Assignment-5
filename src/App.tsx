// App.tsx
import React, { useState, useEffect } from 'react';
import './App.css';
import Product from './components/Product';
import Welcome from './components/Welcome';
import Data from './components/Data';
import SideFilter from './components/SideFilter';
import Sort from './components/Sort';

function App() {
  const allProducts = Data[0].products;
  const productsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState(allProducts.slice(0, productsPerPage));

  const handleToggle = () => {
    console.log('Toggle button clicked');
    // Toggle between pagination and infinite scrolling
    // Implement your logic here
  };

  const handlePagination = (page: number) => {
    console.log('Pagination button clicked', page);
    setCurrentPage(page);
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setDisplayedProducts(allProducts.slice(startIndex, endIndex));
  };


  const handleInfiniteScroll = () => {
    console.log('Infinite scroll triggered');
    // Placeholder logic for infinite scrolling
    const nextIndex = displayedProducts.length;
    const nextProducts = allProducts.slice(nextIndex, nextIndex + productsPerPage);
    setDisplayedProducts((prevProducts) => [...prevProducts, ...nextProducts]);
  };

  useEffect(() => {
    // Attach event listener for infinite scrolling
    window.addEventListener('scroll', handleInfiniteScroll);
    return () => {
      // Remove event listener when component unmounts
      window.removeEventListener('scroll', handleInfiniteScroll);
    };
  }, [displayedProducts]);
  console.log('Current Page:', currentPage);

  return (
    <div className="App w-full h-screen">
      <Welcome />
      <div className='ml-5 md:ml-9 lg:ml-20 xl:ml-36 flex justify-start'>
        <Sort />
        <div className="switch-container ml-5">
          <label className="switch">
            <input type="checkbox" onChange={handleToggle} className="hidden" />
            <div className="slider h-8 w-16 bg-gray-300 rounded-full relative">
              <div className={`slider-label absolute top-1 left-1/2 transform -translate-x-1/2 h-6 w-8 bg-red-500 rounded-full ${currentPage === 1 ? '' : 'left-full'}`}></div>
            </div>
          </label>
        </div>
      </div>
      <div className='mx-4 md:mx-8 lg:mx-16 xl:mx-32 flex flex-row w-half'>
        <div className='w-1/6 mr-6'>
          <SideFilter />
        </div>
        <div className='w-5/6'>
          {displayedProducts.map((product) => (
            <Product
              key={product.id}
              title={product.title}
              image={product.images[0]}
              desc={[product.description]}
              Price={product.price}
              // stars={Array(Number(product.rating) || 0).fill(0)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;