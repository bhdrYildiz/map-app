import React from "react";

const PopupComponent = ({ point, setSelectedPoint, setIsDialogOpen }) => {
  return (
    <div className="p-2 rounded-lg">
      <h2 className="text-xl font-bold mb-2">{point.park_name}</h2>
      <p>
        <strong>Kapasite:</strong> {point.capacity_of_park}
      </p>
      <p>
        <strong>İlçe:</strong> {point.county_name}
      </p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
        onClick={() => {
          setSelectedPoint(point);
          setIsDialogOpen(true);
        }}
      >
        Düzenle
      </button>
    </div>
  );
};

export default PopupComponent;
