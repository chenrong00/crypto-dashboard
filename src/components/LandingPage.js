import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

function LandingPage() {
  const [tradingPairs, setTradingPairs] = useState([]);
  const [quoteCurrency, setQuoteCurrency] = useState("USD");
  const [filteredPairs, setFilteredPairs] = useState([]);
  const [quoteCurrencyOptions, setQuoteCurrencyOptions] = useState(["USD"]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(15);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/trade_pairs");
        if (!response.ok) {
          throw new Error(`HTTP error. Status: ${response.status}`);
        }
        const data = await response.json();
        setTradingPairs(data);

        const uniqueQuoteCurrencies = Array.from(
          new Set(data.map((pair) => pair.quote_currency))
        ).sort();

        setQuoteCurrencyOptions(uniqueQuoteCurrencies);
      } catch (error) {
        setTradingPairs({});
        console.log(error);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    // Filter trading pairs based on the selected quote currency
    const filtered = tradingPairs.filter(
      (pair) => pair.quote_currency === quoteCurrency
    );

    // Apply additional filtering based on the search input
    const searchFiltered = filtered.filter((pair) =>
      pair.base_currency.toLowerCase().includes(searchInput.toLowerCase())
    );

    setFilteredPairs(searchFiltered);
  }, [quoteCurrency, tradingPairs, searchInput]);

  // Calculate the index of the last and first record on the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // Get the current records to display on the page
  const currentRecords = filteredPairs.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredPairs.length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleQuoteCurrencyChange = (event) => {
    setQuoteCurrency(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Cryptocurrency Prices</h1>
        <div className="mb-4">
          <label htmlFor="quoteCurrency" className="mr-2" />
          <select
            id="quoteCurrency"
            name="quoteCurrency"
            value={quoteCurrency}
            onChange={handleQuoteCurrencyChange}
          >
            {quoteCurrencyOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="searchInput" className="mr-2">
            Search Base Currency:
          </label>
          <input
            type="text"
            id="searchInput"
            name="searchInput"
            value={searchInput}
            onChange={handleSearchInputChange}
            placeholder="Search base currency..."
          />
        </div>
        <table className="w-full border-collapse border border-gray-300 shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 text-left">Name</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((crypto, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                <td className="py-2 px-4">
                  <Link to={`/prices/${crypto.id}`}>
                    {crypto.base_currency}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default LandingPage;
