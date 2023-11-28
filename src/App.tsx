import React from 'react';
import './App.css';
import Product from './components/Product';
import Welcome from './components/Welcome';
import Data from './components/Data';
import SideFilter from './components/SideFilter';
import Sort from './components/Sort';

function App() {
  const data = Data;

  return (
    <div className="App w-full h-screen">
      <Welcome />
      <div className='ml-5 md:ml-9 lg:ml-20 xl:ml-36 flex justify-start'>
        <Sort />
      </div>
      <div className='mx-4 md:mx-8 lg:mx-16 xl:mx-32 flex flex-row w-half'>
        <div className='w-1/6 mr-6'>
          <SideFilter />
        </div>
        <div className='w-5/6'>
          {data.map((product) => (
            <Product
              title={product.title}
              image={product.image}
              specs={product.specs}
              features={product.features}
              newPrice={product.newPrice}
              oldPrice={product.oldPrice}
              stars={product.stars}
              reviewsCount={product.reviewsCount}
            />
          ))}
        </div>
      </div>


    </div>
  );
}

export default App;
