import React, { useState } from "react";

const FilterPanel = ({ onFilter }) => {
  const [capacity, setCapacity] = useState("");
  const [locationName, setLocationName] = useState("");
  const [countyName, setCountyName] = useState("");

  const handleCapacityChange = (e) => {
    setCapacity(e.target.value);
  };

  const handleLocationNameChange = (e) => {
    setLocationName(e.target.value);
  };

  const handleCountyNameChange = (e) => {
    setCountyName(e.target.value);
  };

  const handleApplyFilter = () => {
    console.log({ capacity, locationName, countyName });
    onFilter({ capacity, locationName, countyName });
  };

  const handleCancelFilter = () => {
    setCapacity("");
    setLocationName("");
    setCountyName("");
    onFilter({ capacity: "", locationName: "", countyName: "" });
  };

  return (
    <div className="w-64 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Filter</h2>

      <label className="block mb-2">Capacity:</label>
      <input
        type="text"
        value={capacity}
        onChange={handleCapacityChange}
        placeholder="e.g., > 100"
        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
      />

      <label className="block mb-2">Location Name:</label>
      <input
        type="text"
        value={locationName}
        onChange={handleLocationNameChange}
        placeholder="Enter location name"
        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
      />

      <label className="block mb-2">County Name:</label>
      <input
        type="text"
        value={countyName}
        onChange={handleCountyNameChange}
        placeholder="Enter county name"
        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
      />

      <div className="flex justify-between">
        <button
          onClick={handleApplyFilter}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Apply Filter
        </button>
        <button
          onClick={handleCancelFilter}
          className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
        >
          Cancel Filter
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
