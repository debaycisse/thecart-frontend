import React from 'react';

function Home() {
  return (
    <div className="mx-4 lg:mx-60 mb-4 min-h-40 flex flex-row">
      {/* text */}
      <div id="text" className='w-full p-4'>
        <h1 className='text-3xl pb-8'>Welcome to theCart Order Management System</h1>
        <p className='rounded-lg min-h-8 p-4 bg-slate-600 my-4 text-white'>
          We extend your services to the reach of all your cutomers irrespective of their locations.
        </p>
        <p className='my-4'>Streamline your shopping experience with us!</p>
        
      </div>
      {/* image placeholder */}
      <div id="image" className='w-full p-4'>
        <img className='rounded-lg' src="./src/assets/images/home_page_content.jpg" alt="stack of shopping carts" />
      </div>
    </div>
  );
}

export default Home;
