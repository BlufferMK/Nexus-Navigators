function createMap(buildings) {

  // Create the tile layer that will be the background of our map.
  let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });


  // Create a baseMaps object to hold the streetmap layer.
  let baseMaps = {
    "Street Map": streetmap
  };

  // Create an overlayMaps object to hold the bikeStations layer.
  let overlayMaps = {
    "Buildings": buildings
  };

  // Create the map object with options.
  let map = L.map("map-id", {
    center: [41.87, -87.6298],
    zoom: 16,
    layers: [streetmap, buildings]
  });

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

function createMarkers(response) {

  // Pull the "stations" property from response.data.
 

  // Initialize an array to hold buildings.
  let buildings = [];
  console.log(response[0].Latitude);
  // Loop through the stations array.
  for (let index = 0; index < response.length; index++) {
    let location = response[index];

    // For each station, create a marker, and bind a popup with the station's name.
    let building = L.marker([location.Latitude, location.Longitude])
      //.bindPopup("<h3>" + location.Property Name + "<h3><h3>Capacity: " + station.capacity + "</h3>");

    // Add the marker to the bikeMarkers array.
    buildings.push(building);
  }

  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  createMap(L.layerGroup(buildings));
}


// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
d3.json("benchmarking.json").then(createMarkers);


