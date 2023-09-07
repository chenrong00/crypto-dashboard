import { useState, useEffect } from "react";

const axios = require("axios");
const crypto = require("crypto");

const basePath = "https://api-public.sandbox.exchange.coinbase.com";

export const fetchAllPairs = async () => {
  const url = `${basePath}/products?token=${process.env.REACT_APP_API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};

export const getProductCandles = async (
  product_id,
  granularity,
  start,
  end
) => {
  const url = `${basePath}/products/${product_id}/candles?granularity=${granularity}&start=${start}&end=${end}`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};

const apiKey = process.env.REACT_APP_API_KEY;
const apiPassphrase = process.env.REACT_APP_PASSPHRASE;
const apiSecret = process.env.REACT_APP_SECRET;

export const useTradingPairs = () => {
  const [pairs, setPairs] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchTradingPairs = async () => {
      try {
        setLoading(true);

        // Calculate the timestamp for the request
        const timestamp = Date.now() / 1000;

        // Create the signature as per Coinbase's requirements
        const message = `${timestamp}GET/products`;
        // const { createHmac } = await import("crypto");
        const key = Buffer.from(apiSecret, "base64");
        const hmac = crypto.createHmac("sha256", key);
        const signature = hmac.update(message).digest("base64");

        // Set up the request headers
        const headers = {
          "CB-ACCESS-KEY": apiKey,
          "CB-ACCESS-SIGN": signature,
          "CB-ACCESS-TIMESTAMP": timestamp,
          "CB-ACCESS-PASSPHRASE": apiPassphrase,
        };

        // Make the GET request to fetch trading pairs
        const response = await axios.get(`${basePath}/products`, {
          headers,
        });

        // Handle the response data
        if (response.data) {
          setPairs(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching trading pairs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTradingPairs();
  }, []);
  return { pairs, loading };
};

// export const fetchTradingPairs = async () => {
//   try {
//     // Calculate the timestamp for the request
//     const timestamp = Date.now() / 1000;

//     // Create the signature as per Coinbase's requirements
//     const message = `${timestamp}GET/products`;
//     // const { createHmac } = await import("crypto");
//     const key = Buffer.from(apiSecret, "base64");
//     const hmac = crypto.createHmac("sha256", key);
//     const signature = hmac.update(message).digest("base64");

//     // Set up the request headers
//     const headers = {
//       "CB-ACCESS-KEY": apiKey,
//       "CB-ACCESS-SIGN": signature,
//       "CB-ACCESS-TIMESTAMP": timestamp,
//       "CB-ACCESS-PASSPHRASE": apiPassphrase,
//     };

//     // Make the GET request to fetch trading pairs
//     const response = await axios.get(`${basePath}/products`, {
//       headers,
//     });

//     // Handle the response data
//     if (response.data) {
//       setPairs(response.data);
//       console.log(response.data);
//     }
//   } catch (error) {
//     console.error("Error fetching trading pairs:", error);
//   } finally {
//     setLoading(false);
//   }
// };
