import React, { useEffect, useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

function ProductDetail() {
  const { productId } = useParams();
  const { accessToken, addItem } = useContext(CartContext);
  const [productObject, setProductObject] = useState({});
  const [productQty, setProductQty] = useState(1);

  const handleAddToCart = (product, quantity) => {
    addItem(product, quantity);
  };

  const handleProductQty = (event) => {
    const regex = /^[1-9]\d*$/; // Matches only positive digits
    const newValue = event.target.value.replace(/[^1-9]/g, ""); // Remove non-numeric characters

    if (regex.test(newValue)) {
      setProductQty(newValue);
    } else {
      setProductQty(1);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/products/items/${productId}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      let data;
      if (response.ok) {
        data = await response.json();
        setProductObject(data);
      } else {
        const errorData = await response.json();
        console.error("Error while fetching a product's detail", errorData);
      }
    };
    fetchProduct();
  }, [accessToken]);

  if (Object.keys(productObject).length === 0) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="mx-4 lg:mx-60">
      {/* <h1>Product Details</h1> */}
      <div className="max-w-md mx-auto flex flex-row gap-10">
        <img
          src={productObject.image}
          alt={`${productObject.name}'s image`}
          className="flex-grow-1"
        />

        <div className="product-details flex-grow-1">
          <div className="border-b-2 mb-5 pl-4">
            <h1 className="font-bold text-2xl mb-4">{productObject.name}</h1>
            <p className="product-attr mb-2">
              Product Category <b>{productObject.category.name}</b>
            </p>
            <p className="product-attr mb-4">
              Product Group <b>{productObject.group.name}</b>
            </p>
            <p className="product-attr mb-4">
              Availability <b>{productObject.availability}</b>
            </p>
          </div>

          <div className="border-b-2 mb-5  pl-4">
            <h2 className="font-bold text-xl mb-4">$ {productObject.price}</h2>
          </div>

          <div className="border-b-2 mb-5 pb-4 pl-4">
            Quantity{" "}
            <input
              className="max-w-10 pl-1 rounded-sm border-solid border-2"
              type="number"
              name="product_qty"
              id="product_qty"
              value={productQty}
              onChange={handleProductQty}
            />
          </div>

          <div className="border-b-2 pb-8 pt-4 pl-4">
            <Link
              type="button"
              className="bg-yellow-700 p-2 rounded-sm  text-sm text-white hover:bg-yellow-800 hover:text-yellow-300"
              onClick={() => handleAddToCart(productObject, productQty)}
            >
              Add To Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
