import React, { useContext, useEffect, useState } from "react";
import Card from "./Card";
import { mockProductCandle, mockProducts } from "../constants/mock";
import Header from "./Header";
import Overview from "./Overview";
import CandlestickChart from "./CandlestickChart";
import StockContext from "../context/StockContext";
import { fetchAllPairs, getProductCandles } from "../api/stock-api";

const Dashboard = () => {
  // Occupies entire height of screen
  const { stockSymbol } = useContext(StockContext);

  const [productCandle, setProductCandle] = useState({});
  const [quote, setQuote] = useState({});

  useEffect(() => {
    const updateGraph = async () => {
      try {
        const result = await getProductCandles(stockSymbol);
        setProductCandle(result);
      } catch (error) {
        setProductCandle({});
        console.log(error);
      }
    };
    // const updateStockOverview = async () => {
    //   try {
    //     const resu
    //   } catch (error) {
    //     setQuote({});
    //     console.log(error);
    //   }
    // };
    updateGraph();
  }, [stockSymbol]);

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quicksand bg-neutral-100">
      <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
        {/* <Card>Header</Card> */}
        {/* TODO: Change this to only base currency */}
        <Header name={mockProducts[0].display_name} />
        {/* <Header name={stockDetails.display_name} /> */}
      </div>
      <div className="md:col-span-2 row-span-4 w-full h-full">
        {/* <CandlestickChart data={mockProductCandle} /> */}
        {/* <Card>Chart</Card> */}
        <CandlestickChart />
      </div>
      <div>
        <Overview
          symbol={mockProducts[0].base_currency}
          price={300}
          change={30}
          changePercent={10.0}
          currency={mockProducts[0].quote_currency}
        />
        {/* <Overview
          symbol={stockDetails.base_currency}
          price={300}
          change={30}
          changePercent={10.0}
          currency={stockDetails.quote_currency}
        /> */}
      </div>
      <div className="row-span-2 xl:row-span-3">
        <Card>Details</Card>
      </div>
    </div>
  );
};

export default Dashboard;
