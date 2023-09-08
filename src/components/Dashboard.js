import React, { useEffect, useState } from "react";
import Header from "./Header";
import Overview from "./Overview";
import CandlestickChart from "./CandlestickChart";

const Dashboard = ({ product_id }) => {
  const baseCurrency = product_id.split("-")[0];
  const quoteCurrency = product_id.split("-")[1];
  const [productStats, setProductStats] = useState(null);

  useEffect(() => {
    const fetchProductStats = async () => {
      try {
        const response = await fetch(
          `/trade_pairs/stats?product_id=${product_id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error. Status: ${response.status}`);
        }
        const data = await response.json();
        setProductStats(data);
      } catch (error) {
        console.error("Error fetching product stats:", error);
      }
    };

    fetchProductStats();
  }, []);

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-5 md:grid-rows-4 xl:grid-rows-3 auto-rows-fr gap-6 p-10 font-quicksand bg-neutral-100">
      <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
        <Header name={baseCurrency + "/" + quoteCurrency} />
      </div>
      <div className="md:col-span-2 row-span-4 w-full h-full">
        <CandlestickChart product_id={product_id} />
      </div>
      <div className="md:col-span-2 row-span-1 w-full h-full">
        {productStats && (
          <Overview
            symbol={baseCurrency}
            price={productStats.last}
            change={(productStats.high - productStats.low).toFixed(2)}
            changePercent={(
              ((productStats.last - productStats.open) / productStats.open) *
              100
            ).toFixed(2)}
            currency={quoteCurrency}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
