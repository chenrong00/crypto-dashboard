import { useState } from "react";
import Dashboard from "./Dashboard";
import QuoteCurrencyContext, {
  useQuoteCurrency,
} from "../context/QuoteCurrencyContext";
import { useParams } from "react-router-dom";

// function getPrice() {}

function HistoricalPricesPage() {
  const { product_id } = useParams();
  console.log(product_id);
  return <Dashboard product_id={product_id} />;
}

export default HistoricalPricesPage;
