import Dashboard from "./Dashboard";
import { useParams } from "react-router-dom";

function HistoricalPricesPage() {
  const { product_id } = useParams();
  return <Dashboard product_id={product_id} />;
}

export default HistoricalPricesPage;
