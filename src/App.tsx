import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';
import './App.css';
import Product from './components/Product';
import Welcome from './components/Welcome';
import Data from './components/Data';
import SideFilter from './components/SideFilter';
import Sort from './components/Sort';

const layoutTypes = ['default', 'list', 'grid'];

interface ProductLayoutToggleProps {
  selectedLayout: 'default' | 'list' | 'grid';
  onLayoutChange: Dispatch<SetStateAction<'default' | 'list' | 'grid'>>;
}

function ProductLayoutToggle({ selectedLayout, onLayoutChange }: ProductLayoutToggleProps) {
  return (
    <div className="flex items-center space-x-4 mt-4">
      {layoutTypes.map((type) => (
        <button
          key={type}
          className={`text-sm px-2 py-1 rounded ${selectedLayout === type ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => onLayoutChange(type as 'default' | 'list' | 'grid')}
        >
          {type}
        </button>
      ))}
    </div>
  );
}

function App() {
  const allProducts = Data[0].products;
  const productsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState(allProducts.slice(0, productsPerPage));
  const [layoutType, setLayoutType] = useState<'default' | 'list' | 'grid'>('default');

  const handleToggle = () => {
    setLayoutType((prevLayout) => {
      const currentIndex = layoutTypes.indexOf(prevLayout);
      const nextIndex = (currentIndex + 1) % layoutTypes.length;
      return layoutTypes[nextIndex] as 'default' | 'list' | 'grid';
    });
  };

  const handlePagination = (page: number) => {
    setCurrentPage(page);
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setDisplayedProducts(allProducts.slice(startIndex, endIndex));
  };

  const handleInfiniteScroll = () => {
    const nextIndex = displayedProducts.length;
    const nextProducts = allProducts.slice(nextIndex, nextIndex + productsPerPage);
    setDisplayedProducts((prevProducts) => [...prevProducts, ...nextProducts]);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll);
    return () => {
      window.removeEventListener('scroll', handleInfiniteScroll);
    };
  }, [displayedProducts]);

  return (
    <div className="App w-full h-screen">
      <Welcome />
      <div className="ml-5 md:ml-9 lg:ml-20 xl:ml-36 flex justify-start">
        <Sort />
        <div className="switch-container ml-5">
          <label className="switch">
            <input type="checkbox" onChange={handleToggle} className="hidden" />
            <div className="slider h-8 w-16 bg-gray-300 rounded-full relative">
              <div
                className={`slider-label absolute top-1 left-1/2 transform -translate-x-1/2 h-6 w-8 bg-red-500 rounded-full ${currentPage === 1 ? '' : 'left-full'
                  }`}
              ></div>
            </div>
          </label>
        </div>
      </div>
      <ProductLayoutToggle selectedLayout={layoutType} onLayoutChange={setLayoutType} />
      <div className="mx-4 md:mx-8 lg:mx-16 xl:mx-32 flex flex-row w-half">
        <div className="w-1/6 mr-6">
          <SideFilter />
        </div>
        <div className="w-5/6">
          {displayedProducts.map((product) => (
            <Product
              key={product.id}
              title={product.title}
              images={product.images}
              desc={[product.description]}
              price={product.price}
              layoutType={layoutType}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;