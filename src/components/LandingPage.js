import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAllPairs } from "../api/stock-api";

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/historical-prices">Historical Prices</Link>
        </li>
      </ul>
    </nav>
  );
}

function LandingPage() {
  const [data, setData] = useState([]);
  // const [selectedCurrency, setSelectedCurrency] = useState("USD");
  // const [loading, setLoading] = useState(true);

  const [tradingPairs, setTradingPairs] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const result = await fetchAllPairs();
        setTradingPairs(result);
      } catch (error) {
        setTradingPairs({});
        console.log(error);
      }
    };
    getProducts();
  }, []);

  // Pagination
  // const [currentPage, setCurrentPage] = useState(1);
  // const [recordsPerPage] = useState(25);

  // const indexOfLastRecord = currentPage * recordsPerPage;
  // const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  // const nPages = Math.ceil(data.length / recordsPerPage);

  // // Records to be displayed on the current page
  // const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  // const cryptocurrencies = [
  //   { name: "Bitcoin", symbol: "BTC", price: 45000.0 },
  //   { name: "Ethereum", symbol: "ETH", price: 3200.0 },
  //   { name: "Ripple", symbol: "XRP", price: 1.2 },
  //   // Add more cryptocurrencies as needed
  // ];

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Cryptocurrency Prices</h1>
        <table className="w-full border-collapse border border-gray-300 shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 text-left">Name</th>
              <th className="py-2 px-4 bg-gray-200 text-left">Symbol</th>
              <th className="py-2 px-4 bg-gray-200 text-left">Price (USD)</th>
            </tr>
          </thead>
          <tbody>
            {/* {cryptocurrencies.map((crypto, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                <td className="py-2 px-4">
                  <Link to={`/prices/${crypto.symbol}`}>{crypto.name}</Link>
                </td>
                <td className="py-2 px-4">{crypto.symbol}</td>
                <td className="py-2 px-4">${crypto.price.toFixed(2)}</td>
              </tr>
            ))} */}
            {tradingPairs.map((crypto, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                <td className="py-2 px-4">
                  <Link to={`/prices/${crypto.id}`}>{crypto.display_name}</Link>
                </td>
                {/* <td className="py-2 px-4">{crypto.symbol}</td> */}
                {/* <td className="py-2 px-4">${crypto.price.toFixed(2)}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LandingPage;
