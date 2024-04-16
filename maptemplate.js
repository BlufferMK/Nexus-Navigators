// read in the data for the buildings
d3.json("updatedData.json").then(function (response) {

    // Build 2014 array
    let buildings2014 = [];

    //Filter out only rows with DataYear = 2014            Buildings had one year to comply
    var filtered2014 = response.filter(a => a.DataYear == 2014);

    // Loop through the whole array and filter out the latitude and longitude
    for (let index = 0; index < filtered2014.length; index++) {
        let location = filtered2014[index];

        // For each building, create a marker, and bind a popup. For now - its the name and address
        let building2014 = L.circle([location.Latitude, location.Longitude],
            {
                radius: location["GHG Intensity (kg CO2e/sq ft)"] * 5,
                color: 'red'
            })
            .bindPopup("<h3>" + location.PropertyName + "<h3><h3>Address: " + location.Address + "</h3>" + location["GHG Intensity (kg CO2e/sq ft)"] + 'kg CO2e/sq ft');

        // Add the marker to the buildings2014 array
        buildings2014.push(building2014);
    }
    // Create a LAYER GROUP with the buildings2014 array
    var fourteen = L.layerGroup(buildings2014);

    //  2014 data and markers and layer group prepared!!!!


    // Create the tile layer that will be the background of our map.
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });


    // Create a baseMaps object to hold the streetmap layer.
    let baseMaps = {
        "Street Map": streetmap
    };

    // Create an overlayMaps object to hold the 2014 (fourteen) layer.
    let overlayMaps = {
        "2014": fourteen
    };

    // Create the map object with options.
    let map = L.map("map-id", {
        center: [41.88, -87.6428],
        zoom: 15,
        layers: [streetmap, fourteen]
    });

    // The map has now been ADDED



    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    var layerControl = L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);



    // Build 2015 array
    let buildings2015 = [];
    //Filter out only rows with DataYear = 2015 
    var filtered2015 = response.filter(a => a.DataYear == 2015);

    // Loop through the 2015 array.
    for (let index = 0; index < filtered2015.length; index++) {
        let location = filtered2015[index];

        // For each building, create a marker, and bind a popup 
        let building2015 = L.circle([location.Latitude, location.Longitude], { radius: location["GHG Intensity (kg CO2e/sq ft)"] * 5 })
            .bindPopup("<h3>" + location.PropertyName + "<h3><h3>Address: " + location.Address + "</h3>" + location["GHG Intensity (kg CO2e/sq ft)"] + 'kg CO2e/sq ft');

        // Add the marker to the 2015 array.
        buildings2015.push(building2015);
        // Create a LAYER GROUP with the buildings2015 array
        var fifteen = L.layerGroup(buildings2015);
    };
    layerControl.addOverlay(fifteen, "2015");



    d3.json("chicagoNeighborhoods.geojson").then(function (data) {
        let neighborhoods = [];
        
        
        for (let index = 0; index < 10; index++) {
            
            let location = data.features[index].geometry;
            console.log(location);
        
            
            let neighborhood = L.polygon([location.coordinates],{fillColor: "black", fillOpacity: 0.9})
                .bindPopup("<h3>" + 'Neighborhood: ' + data.features[index].properties.sec_neigh + "</h3>");
                console.log(neighborhood);
            neighborhoods.push(neighborhood);

            var areas = L.layerGroup(neighborhoods);
        };
      
        layerControl.addOverlay(areas, "Neighborhood");
    })
})