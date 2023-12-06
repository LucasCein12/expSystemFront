import { createContext, useRef, useState } from "react";
export const ProvRouteContext= createContext()
export const MyProvider = ({ children }) => {
    const [value, setValue] = useState()
    const ref =useRef(value)
      return (
          <ProvRouteContext.Provider value={{ref,setValue}}>
            {children}
          </ProvRouteContext.Provider>)
  }