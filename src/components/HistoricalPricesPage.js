import { useState } from "react";
import Dashboard from "./Dashboard";
import StockContext from "../context/StockContext";

// function getPrice() {}

function HistoricalPricesPage({ baseCurrency, quoteCurrency }) {
  const [stockSymbol, setStockSymbol] = useState("btc-usd");
  return (
    // <div className="bg-green-200 p-5">
    //   <h1 className="text-3xl font-bold mb-4">Historical Prices</h1>
    // <p className="text-lg">
    //   Select assets and date ranges to view historical prices.
    // </p>
    <StockContext.Provider value={(stockSymbol, setStockSymbol)}>
      <Dashboard />
    </StockContext.Provider>

    //   </div>
  );
}

export default HistoricalPricesPage;
