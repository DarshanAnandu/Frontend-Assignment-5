import React from 'react';
import './App.css';
import Product from './components/Product';
import Welcome from './components/Welcome';
import Data from './components/Data';
import SideFilter from './components/SideFilter';

function App() {
  const data = Data;

  return (
    <div className="App w-full h-screen">
      <Welcome />
      <div className='mx-4 md:mx-8 lg:mx-16 xl:mx-32 flex flex-row w-full'>
        <div className='w-1/6'>
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
