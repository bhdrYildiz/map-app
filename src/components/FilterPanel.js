import React, { useState } from "react";

const FilterPanel = ({ onFilter }) => {
  const [capacity, setCapacity] = useState("");
  const [countyName, setCountyName] = useState("");

  const handleCapacityChange = (e) => {
    setCapacity(e.target.value);
  };

  const handleCountyNameChange = (e) => {
    setCountyName(e.target.value);
  };

  const handleApplyFilter = () => {
    onFilter({ capacity, countyName });
  };

  const handleCancelFilter = () => {
    setCapacity("");
    setCountyName("");
    onFilter({ capacity: "", countyName: "" });
  };

  return (
    <div className="w-64 p-3 bg-white shadow-md rounded-lg flex flex-col justify-between h-full">
      <div className="flex-grow overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Filtreleme</h2>
        <label className="block mb-2">Kapasite:</label>
        <input
          type="text"
          value={capacity}
          onChange={handleCapacityChange}
          placeholder="e.g., > 100"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        />

        <label className="block mb-2">İlçe ismi:</label>
        <input
          type="text"
          value={countyName}
          onChange={handleCountyNameChange}
          placeholder="Enter county name"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        />
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={handleApplyFilter}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 flex-1 mr-2"
        >
          Filtrele
        </button>
        <button
          onClick={handleCancelFilter}
          className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 flex-1"
        >
          Resetle
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
