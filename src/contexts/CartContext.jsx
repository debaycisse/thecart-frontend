import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const addItem = (productItem, quantity) => {
    const newItem = { productItem: productItem, quantity: quantity };
    let temp = [...cartItems];

    const existingItemIndex = cartItems.findIndex(
      (item) => item.productItem.id === newItem.productItem.id
    );

    if (existingItemIndex !== -1) {
      temp[existingItemIndex] = {
        ...temp[existingItemIndex],
        quantity: temp[existingItemIndex].quantity + newItem.quantity,
      };
    } else {
      temp.push(newItem);
    }

    setCartItems(temp);

  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.productItem.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateAccessToken = (newToken) => {
    setAccessToken(newToken);
  };

  const updateCurrentUser = (user) => {
    setCurrentUser(user);
  };

  const userHasLoggedOn = () => {
    if (!currentUser) {
      return false;
    } else if (currentUser) {
      const getUsers = async () => {
        try {
          const response = await fetch(
            `http://localhost:8000/api/v1/auth/users/${currentUser.user.id}/`,
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          if (response.ok) {
            return true;
          } else {
            return false;
          }
        } catch {
          console.error("Error obtaining user's data");
          return false;
        }
      };
      return getUsers();
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
        clearCart,
        accessToken,
        updateAccessToken,
        currentUser,
        updateCurrentUser,
        userHasLoggedOn,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
