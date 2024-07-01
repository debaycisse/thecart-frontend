import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const addItem = (productItem, quantity) => {
    const item = { "productItem": productItem, "quantity": quantity };
    setCartItems([...cartItems, item]);
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((productItem) => productItem.id !== id));
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
