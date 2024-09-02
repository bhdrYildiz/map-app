import React, { useState } from "react";
import Map from "./components/Map";

const App = () => {
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const toggleFilterPanel = () => {
    setShowFilterPanel(!showFilterPanel);
  };

  return (
    <div className="relative w-full h-screen">
      <button
        onClick={toggleFilterPanel}
        className="absolute top-4 left-4 z-10 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
      >
        {showFilterPanel ? "Filtrelemeyi Gizle" : "Filtrelemeyi Göster"}
      </button>
      <Map showFilterPanel={showFilterPanel} />
    </div>
  );
};

export default App;
