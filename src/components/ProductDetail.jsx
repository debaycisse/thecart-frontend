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
      const url = `http://127.0.0.1:8000/api/v1/products/items/${productId}/`;
      // try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
            console.log(data);
          setProductObject(data);
        } else {
          const errorData = await response.json();
          console.error("Error while fetching a product's detail", errorData);
        }
      // } catch (error) {
      //   console.error("Network error:", error);
      // }
    };

    if (accessToken && productId) {
      fetchProduct();
    }
  }, []);

  // const fetchProduct = async () => {
  //   const url = `http://127.0.0.1:8000/api/v1/products/items/${productId}/`;
  //   try {
  //     const response = await fetch(url, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data);
  //       setProductObject(data);
  //     } else {
  //       const errorData = await response.json();
  //       console.error("Error while fetching a product's detail", errorData);
  //     }
  //   } catch (error) {
  //     console.error("Network error:", error);
  //   }
  // };

  // if (accessToken && productId) {
  //   fetchProduct();
  // }

  return (
    <div className="mx-4 lg:mx-60">
      {/* <h1>Product Details</h1> */}
      <div className="mx-auto flex flex-row gap-10">
        <img
          src={productObject.image_url}
          alt={`${productObject.name}'s image`}
          className="flex-grow-1"
        />

        <div className="product-details flex-grow-1">
          <div className="border-b-2">
            <h1 className="font-bold text-2xl">{productObject.name}</h1>
            <p>
              Product Category <b>{productObject.category.name}</b>
            </p>
            <p>
              Product Group <b>{productObject.group.name}</b>
            </p>
          </div>

          <div className="border-b-2">
            <h2 className="font-bold text-xl">$ {productObject.price}</h2>
          </div>

          <div className="border-b-2">
            Quantity{" "}
            <input
              className="max-w-10 pl-1 rounded-sm"
              type="number"
              name="product_qty"
              id="product_qty"
              value={productQty}
              onChange={handleProductQty}
            />
          </div>

          <div className="border-b-2">
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
