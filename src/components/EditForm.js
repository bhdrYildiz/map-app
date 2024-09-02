import React, { useState } from "react";

const EditForm = ({ point, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    id: point.id,
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
    const parsedValue =
      name === "CAPACITY_OF_PARK" || name === "LONGITUDE" || name === "LATITUDE"
        ? parseFloat(value) || 0
        : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("error:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Park Noktalarını Düzenle</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              İspark Adı
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
              Lokasyon Adı
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
              Kapasite
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
              Çalışma Saatleri
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
              İlçe adı
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
              İptal Et
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
