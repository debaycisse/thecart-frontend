import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductDetail from './ProductDetail';
import { CartContext } from '../contexts/CartContext';


function ProductItem({ product }) {

  const [ productQty, setProductQty ] = useState(0);
  const {addItem} = useContext(CartContext);

  const handleAddToCart = (product, quantity) => {
    addItem(product, quantity);
  }

  const handleDelete = (productId) => {
    // TODO: Delete the given product and return to product listing page
  }

  const handleModify = (productId) => {
    // TODO: Update product and return to prduct listing page
  }

  const handleProductQty = (event) => {
    const regex = /^[1-9]\d*$/; // Matches only positive digits
    const newValue = event.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters

    if(regex.test(newValue)){
      setProductQty(newValue);
    } else {
      setProductQty(0);
    }
  }




  return (
    <div className="mb-4 p-4 border-t-2">
      <div className="flex flex-row justify-around flex-grow-2 mr-2">
        {/* product's summarized details */}
        <Link to={"/product-detail/" + product.id}>
          <img src={product.image} className="max-w-10 max-h-10 rounded-sm" alt={product.name} />
          <h3 className="text-base font-bold mb-4">product.name</h3>
          <p>$product.price</p>
          <p>product.quantity</p>  
        </Link>

        {/* product's controls */}
        <div className='product-controls flex-grow-1'>
          <div className='mb-5 flex flex-row'>
            <Link 
            className='bg-yellow-700 p-2 rounded-sm  text-sm text-white hover:bg-yellow-800 hover:text-yellow-300 mr-2'
            onClick={() => handleAddToCart(product.id, productQty)}>
              Add to cart
            </Link>
            <input className='max-w-10 pl-1 rounded-sm' type="number" name="product_qty" id="product_qty" value={productQty} onChange={handleProductQty} />
          </div>
          <Link
          className='bg-red-700 p-2 rounded-sm  text-sm text-white hover:bg-red-600 hover:text-red-300'
          onClick={() => handleDelete(product.id)}>
            Delete
          </Link>
          <Link 
          className='bg-blue-700 p-2 rounded-sm  text-sm text-white hover:bg-blue-800 hover:text-blue-300'
          onClick={() => handleModify(product.id)}>
            Modify
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
