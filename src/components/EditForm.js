import React, { useState } from "react";
import axios from "axios";

const EditForm = ({ point, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    id: point.id, // Bu satırı ekliyoruz
    PARK_NAME: point.park_name,
    LOCATION_NAME: point.location_name,
    CAPACITY_OF_PARK: point.capacity_of_park,
    WORKING_TIME: point.working_time,
    COUNTY_NAME: point.county_name,
    LONGITUDE: point.longitude,
    LATITUDE: point.latitude,
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Eğer alan sayısal bir değer bekliyorsa, parse et
    const parsedValue = name === "CAPACITY_OF_PARK" || name === "LONGITUDE" || name === "LATITUDE"
      ? parseFloat(value) || 0
      : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting data for ID:", formData.id); // `formData.id`'yi doğru kullanma
    try {
      const response = await axios.put(
        `http://localhost:3000/api/update/${formData.id}`, 
        formData
      );
      console.log("Data successfully updated:", response.data);
      if (onSubmit) onSubmit(formData);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
 
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Edit Parking Spot</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Park Name
            </label>
            <input
              type="text"
              name="PARK_NAME"
              value={formData.PARK_NAME}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location Name
            </label>
            <input
              type="text"
              name="LOCATION_NAME"
              value={formData.LOCATION_NAME}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Capacity
            </label>
            <input
              type="number"
              name="CAPACITY_OF_PARK"
              value={formData.CAPACITY_OF_PARK}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Working Hours
            </label>
            <input
              type="text"
              name="WORKING_TIME"
              value={formData.WORKING_TIME}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              County Name
            </label>
            <input
              type="text"
              name="COUNTY_NAME"
              value={formData.COUNTY_NAME}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Longitude
            </label>
            <input
              type="number"
              name="LONGITUDE"
              value={formData.LONGITUDE}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Latitude
            </label>
            <input
              type="number"
              name="LATITUDE"
              value={formData.LATITUDE}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="mr-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
