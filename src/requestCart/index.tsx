import React, { FC, createContext, useContext, useState } from "react";
import type { SelfServiceCart, RequestCartState, RequestCartContextProps } from './types'; 

const StateContext = createContext<RequestCartState>({
  cart: {} as SelfServiceCart,
  setCart: () => {},
});

export const RequestCartStateProvider: FC<RequestCartContextProps> = ({ children }) => {
  const [cart, setCart] = useState({} as SelfServiceCart);

  return (
    <StateContext.Provider
      value={{
        cart,
        setCart,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useCart = () => useContext(StateContext);

const RequestCart = {
  RequestCartStateProvider,
  useCart
};

export default RequestCart;
