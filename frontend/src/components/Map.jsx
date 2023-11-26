import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";

function Map() {
  useEffect(() => {
    var map = L.map("map").setView([-7.770400, 110.377834], 19);
    
    var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });
    
    osm.addTo(map);

    //GMaps, Leaflet draw
    var drawnItems = L.featureGroup().addTo(map);
    L.control.layers({
        'osm': osm.addTo(map),
        "google": L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
            attribution: 'google'
        })
    }, { 'drawlayer': drawnItems }, { position: 'topleft', collapsed: false }).addTo(map);
    map.addControl(new L.Control.Draw({
        edit: {
            featureGroup: drawnItems,
            poly: {
                allowIntersection: false
            }
        },
        draw: {
            polygon: {
                allowIntersection: false,
                showArea: true
            }
        }
    }));

    //Click untuk menampilkan koordinat
    var popup = L.popup();

    function onMapClick(e) {
      popup
        .setLatLng(e.latlng)
        .setContent(`You clicked the map at ${e.latlng.toString()}`)
        .openOn(map);
    }

    map.on('click', onMapClick);


    map.on(L.Draw.Event.CREATED, function (event) {
      var layer = event.layer;
      const geojson = layer.toGeoJSON();

      // Send the drawn shape to the backend
      fetch("http://localhost:3001/drawings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ geojson }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Drawing saved with ID:", data.id);
        })
        .catch((error) => {
          console.error("Error saving drawing:", error);
        });

      drawnItems.addLayer(layer);
    });


    return () => {
      map.remove();
    };
  }, []);

  return (
    <div>
      <div id="map" className="flex-grow" style={{ height: "100vh" }}></div>
    </div>
  );
}

export default Map;
