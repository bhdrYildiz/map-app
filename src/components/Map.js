import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import axios from "axios";
import FilterPanel from "./FilterPanel";
import EditForm from "./EditForm";
import PopupComponent from "./PopupComponent";

const Map = ({ showFilterPanel }) => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const initializeMap = async () => {
      const mapInstance = new maplibregl.Map({
        container: mapContainerRef.current,
        style: "https://basemap.ibb.gov.tr/static/rehber_altlik.json?id=281",
        center: [28.98989, 41.01411], // Istanbul coordinates
        zoom: 10,
      });

      mapInstance.addControl(new maplibregl.NavigationControl(), "top-right");
      setMap(mapInstance);
    };

    initializeMap();
    return () => {
      if (map) map.remove();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/ispark");

        // Veri doğrulama fonksiyonu ve filtreleme işlemi burada devam eder...
        const isValidCoordinate = (coord, min, max) =>
          typeof coord === "number" && coord >= min && coord <= max;

        const validData = response.data.filter(
          (point) =>
            isValidCoordinate(point.latitude, -90, 90) &&
            isValidCoordinate(point.longitude, -180, 180)
        );

        setData(validData);
        setFilteredData(validData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilter = ({ capacity, locationName, countyName }) => {
    const filtered = data.filter((point) => {
      const matchesCapacity =
        !capacity || point.capacity_of_park > parseInt(capacity);
      const matchesLocationName =
        !locationName 
        point.location_name.toLowerCase().includes(locationName.toLowerCase());
      const matchesCountyName =
        !countyName ||
        point.county_name.toLowerCase().includes(countyName.toLowerCase());

      return matchesCapacity && matchesLocationName && matchesCountyName;
    });

    setFilteredData(filtered);
  };

  useEffect(() => {
    if (map && filteredData.length > 0) {
      markers.forEach((marker) => marker.remove());
      setMarkers([]);

      const newMarkers = [];

      filteredData.forEach((point) => {
        if (
          typeof point.longitude === "number" &&
          typeof point.latitude === "number"
        ) {
          const marker = new maplibregl.Marker()
            .setLngLat([point.longitude, point.latitude])
            .addTo(map);
          const popupNode = document.createElement("div");

          ReactDOM.render(
            <PopupComponent
              point={point}
              popupNode={popupNode}
              setSelectedPoint={setSelectedPoint}
              setIsDialogOpen={setIsDialogOpen}
            />,
            popupNode
          );

          const popup = new maplibregl.Popup().setDOMContent(popupNode);
          marker.setPopup(popup);

          newMarkers.push(marker);
        } else {
          console.error(`Invalid coordinates for point: ${point._id}`);
        }
      });

      setMarkers(newMarkers);
    }
  }, [map, filteredData]);

  const handleFormSubmit = async (updatedData) => {
    try {
      await axios.put(
        `http://localhost:3000/api/update/${updatedData.id}`,
        updatedData
      );

      setData((prevData) =>
        prevData.map((point) =>
          point._id === updatedData._id ? updatedData : point
        )
      );

      setSelectedPoint(null);
      setIsDialogOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };

  return (
    <div className="relative">
      <div
        className="map-container"
        ref={mapContainerRef}
        style={{ height: "calc(100vh - 60px)" }}
      />
      {showFilterPanel && (
        <div className="absolute top-0 left-0 w-full bg-white shadow-lg p-4 h-80 overflow-y-auto flex">
          <div className="flex-shrink-0 w-64">
            <FilterPanel onFilter={handleFilter} />
          </div>
          <div className="flex-1 ml-4">
            <div className="park-list max-h-full overflow-y-auto">
              {filteredData.map((point) => (
                <div
                  key={point._id}
                  className="cursor-pointer p-2 hover:bg-gray-200"
                  onClick={() => {
                    map.flyTo({
                      center: [point.longitude, point.latitude],
                      zoom: 14,
                    });
                    setSelectedPoint(point);
                  }}
                >
                  {point.park_name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {isDialogOpen && selectedPoint && (
        <EditForm
          point={selectedPoint}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default Map;
