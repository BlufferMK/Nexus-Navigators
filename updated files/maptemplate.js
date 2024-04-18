d3.json("benchmarking.json").then(function(response) {

    // Initialize an array to hold the markers for all buildings
    let buildings = [];

    // Loop through the array and create markers
    response.forEach(location => {
        // For each building, create a marker and bind a popup with its name and address
        let building = L.marker([location.Latitude, location.Longitude])
            .bindPopup("<h3><p>Name:" + location.Name + "</h3><p>Address: " + location.Address + "</p>");

        // Add the marker to the buildings array
        buildings.push(building);
    });

    // Create a layer group with the buildings array
    var buildingsLayer = L.layerGroup(buildings);

    // Create the tile layer that will be the background of our map
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Create a baseMaps object to hold the streetmap layer
    let baseMaps = {
        "Street Map": streetmap
    };

    // Create an overlayMaps object to hold the buildings layer
    let overlayMaps = {
        "All Buildings": buildingsLayer
    };

    // Create the map object with options
    let map = L.map("map-id", {
        center: [41.88, -87.6428], // Adjust the center coordinates if needed
        zoom: 15,
        layers: [streetmap, buildingsLayer] // Default visible layers
    });

    // Create a layer control, pass it baseMaps and overlayMaps, and add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);
});
