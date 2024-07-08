import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { NumericFormat } from "react-number-format";

/**
 * Handles a product's detail page where
 * user can add the product to cart
 */
function ProductDetail() {
  const { productId } = useParams();
  const { accessToken, userHasLoggedOn } = useContext(CartContext);
  const [productObject, setProductObject] = useState({});
  const [productQty, setProductQty] = useState(1);
  const [cartMessage, setCartMessage] = useState("");
  const navigate = useNavigate();

  // Event handler for adding an item to cart
  const handleAddToCart = async (product, quantity) => {
    const requestData = [{ product_id: product.id, quantity: quantity }];
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/ordering/orders/cart-item/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        setCartMessage("Added to cart successfully!");

        const timeOutId = setTimeout(() => {
          setCartMessage("");
        }, 3000);
        return () => clearTimeout(timeOutId);
      } else {
        console.error(
          "Error while processing Add to Cart: ",
          responseData.error
        );
      }
    } catch (error) {
      console.error("Network error while adding item to Cart: ", error);
    }
  };

  /**
   * Event handler for product quantity. It ensures value can only be
   * positive and the value can not be more than what is available stock.
   */
  const handleProductQty = (event) => {
    event.preventDefault();
    const newValue = parseInt(event.target.value);
    if (newValue < 1) {
      setProductQty(1);
    } else if (newValue > parseInt(productObject.available)) {
      setProductQty(newValue - 1);
    } else {
      setProductQty(parseInt(event.target.value));
    }
  };

  /**
   * Ensure that the passed product's information is
   * fetched and stored for later use in the component.
   */
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

  if (!userHasLoggedOn()) {
    return navigate(`/login/product-detail/${productId}`)
  }

  /**
   * Returns the information of the passed product item.
   */
  return (
    <>
      {cartMessage && (
        <p className="text-lime-600 font-bold max-w-3xl mx-auto text-center mb-7 text-xl">
          {cartMessage}
        </p>
      )}
      <div className="max-w-3xl mx-auto">
        {/* <h1>Product Details</h1> */}
        <div className="flex flex-row gap-10">
          <img
            src={productObject.image}
            alt={`${productObject.name}'s image`}
            className="flex-grow-1 w-1/2"
          />

          <div className="product-details flex-grow-1 w-1/2">
            <div className="border-b-2 mb-5 pl-4">
              <h1 className="font-bold text-2xl mb-4">{productObject.name}</h1>
              <p className="product-attr mb-2">
                Product Category <b>{productObject.category.name}</b>
              </p>
              <p className="product-attr mb-2">
                Product Group <b>{productObject.group.name}</b>
              </p>
              <p className="product-attr mb-2">
                Availability <b>{productObject.availability}</b>
              </p>
              <p className="product-attr">Product Desccription</p>
              <p className="product-attr mb-4">{productObject.description}</p>
            </div>

            <div className="border-b-2 mb-5  pl-4">
              {/* <h2 className="font-bold text-xl mb-4">$ {productObject.price}</h2> */}
              <NumericFormat
                thousandSeparator={true}
                decimalScale={2}
                fixedDecimalScale={true}
                value={productObject.price}
                allowNegative={false}
                disabled={true}
                className="font-bold text-xl mb-4"
                prefix="$"
              />
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
    </>
  );
}

export default ProductDetail;
