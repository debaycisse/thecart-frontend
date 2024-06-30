import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

function UserProfile() {
  const {currentUser} = useContext(CartContext);

  return (
    <div className="mx-4 lg:mx-60 mt-5 rounded-lg shadow-md bg-slate-400 p-4">
      <h2 className='font-bold text-base'>User Profile</h2>
      <div>
        
      </div>
      
    </div>
  );
}

export default UserProfile;
