import React, { useState } from "react";
import Map from "./components/Map";

const App = () => {
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const toggleFilterPanel = () => {
    setShowFilterPanel(!showFilterPanel);
  };

  return (
    <div className="app-container p-4">
      <h1 className="text-2xl font-bold mb-4">İBB Harita Uygulaması</h1>
      <button
        onClick={toggleFilterPanel}
        className="filter-toggle-btn bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 mb-4"
      >
        {showFilterPanel ? "Filtrelemeyi Gizle" : "Filtrelemeyi Göster"}
      </button>
      <Map showFilterPanel={showFilterPanel} />
    </div>
  );
};

export default App;
