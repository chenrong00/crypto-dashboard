import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import HistoricalPricesPage from "./components/HistoricalPricesPage";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/prices/:crypto" element={<HistoricalPricesPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
