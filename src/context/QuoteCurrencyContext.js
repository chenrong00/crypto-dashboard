import React, { useState, useContext } from "react";

export const QuoteCurrencyContext = React.createContext();

export const QuoteCurrencyProvider = ({ children }) => {
  const [quoteCurrency, setQuoteCurrency] = useState("USD"); // Set a default quote currency

  return (
    <QuoteCurrencyContext.Provider value={{ quoteCurrency, setQuoteCurrency }}>
      {children}
    </QuoteCurrencyContext.Provider>
  );
};

export const useQuoteCurrency = () => {
  const context = useContext(QuoteCurrencyContext);
  if (!context) {
    throw new Error(
      "useQuoteCurrency must be used within a QuoteCurrencyProvider"
    );
  }
  return context;
};
