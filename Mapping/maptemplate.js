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
                color: '#711415'
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
        center: [41.88, -87.7128],
        zoom: 13,
        layers: [streetmap, fourteen]
    });

    // The map has now been ADDED



    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    var layerControl = L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);

    //  2015

    // Build 2015 array
    let buildings2015 = [];
    //Filter out only rows with DataYear = 2015 
    var filtered2015 = response.filter(a => a.DataYear == 2015);

    // Loop through the 2015 array.
    for (let index = 0; index < filtered2015.length; index++) {
        let location = filtered2015[index];

        // For each building, create a marker, and bind a popup 
        let building2015 = L.circle([location.Latitude, location.Longitude],
            { radius: location["GHG Intensity (kg CO2e/sq ft)"] * 5, color: "#ae311e" })
            .bindPopup("<h3>" + location.PropertyName + "<h3><h3>Address: " + location.Address + "</h3>" + location["GHG Intensity (kg CO2e/sq ft)"] + 'kg CO2e/sq ft');

        // Add the marker to the 2015 array.
        buildings2015.push(building2015);
        // Create a LAYER GROUP with the buildings2015 array
        var fifteen = L.layerGroup(buildings2015);
    };
    layerControl.addOverlay(fifteen, "2015");

    // 2016

    // Build 2016 array
    let buildings2016 = [];
    //Filter out only rows with DataYear = 2016
    var filtered2016 = response.filter(a => a.DataYear == 2016);

    // Loop through the 2016 array.
    for (let index = 0; index < filtered2016.length; index++) {
        let location = filtered2016[index];

        // For each building, create a marker, and bind a popup 
        let building2016 = L.circle([location.Latitude, location.Longitude], {
            radius: location["GHG Intensity (kg CO2e/sq ft)"] * 5,
            color: "#f37324"
        })
            .bindPopup("<h3>" + location.PropertyName + "<h3><h3>Address: " + location.Address + "</h3>" + location["GHG Intensity (kg CO2e/sq ft)"] + 'kg CO2e/sq ft');

        // Add the marker to the 2016 array.
        buildings2016.push(building2016);
        // Create a LAYER GROUP with the buildings2016 array
        var sixteen = L.layerGroup(buildings2016);
    };
    layerControl.addOverlay(sixteen, "2016");


    // 2017

    // Build 2017 array
    let buildings2017 = [];
    //Filter out only rows with DataYear = 2017
    var filtered2017 = response.filter(a => a.DataYear == 2017);

    // Loop through the 2017 array.
    for (let index = 0; index < filtered2017.length; index++) {
        let location = filtered2017[index];

        // For each building, create a marker, and bind a popup 
        let building2017 = L.circle([location.Latitude, location.Longitude], {
            radius: location["GHG Intensity (kg CO2e/sq ft)"] * 5,
            color: "#f6a020"
        })
            .bindPopup("<h3>" + location.PropertyName + "<h3><h3>Address: " + location.Address + "</h3>" + location["GHG Intensity (kg CO2e/sq ft)"] + 'kg CO2e/sq ft');

        // Add the marker to the 2017 array.
        buildings2017.push(building2017);
        // Create a LAYER GROUP with the buildings2017 array
        var seventeen = L.layerGroup(buildings2017);
    };
    layerControl.addOverlay(seventeen, "2017");


    // 2018

    // Build 2018 array
    let buildings2018 = [];
    //Filter out only rows with DataYear = 2018
    var filtered2018 = response.filter(a => a.DataYear == 2018);

    // Loop through the 2018 array.
    for (let index = 0; index < filtered2018.length; index++) {
        let location = filtered2018[index];

        // For each building, create a marker, and bind a popup 
        let building2018 = L.circle([location.Latitude, location.Longitude], {
            radius: location["GHG Intensity (kg CO2e/sq ft)"] * 5,
            color: "#f8cc1b"
        })
            .bindPopup("<h3>" + location.PropertyName + "<h3><h3>Address: " + location.Address + "</h3>" + location["GHG Intensity (kg CO2e/sq ft)"] + 'kg CO2e/sq ft');

        // Add the marker to the 2018 array.
        buildings2018.push(building2018);
        // Create a LAYER GROUP with the buildings2018 array
        var eighteen = L.layerGroup(buildings2018);
    };
    layerControl.addOverlay(eighteen, "2018");

    // 2020

    // Build 2020 array
    let buildings2020 = [];
    //Filter out only rows with DataYear = 2020
    var filtered2020 = response.filter(a => a.DataYear == 2020);

    // Loop through the 2020 array.
    for (let index = 0; index < filtered2020.length; index++) {
        let location = filtered2020[index];

        // For each building, create a marker, and bind a popup 
        let building2020 = L.circle([location.Latitude, location.Longitude], {
            radius: location["GHG Intensity (kg CO2e/sq ft)"] * 5,
            color: "#b5be2f"
        })
            .bindPopup("<h3>" + location.PropertyName + "<h3><h3>Address: " + location.Address + "</h3>" + location["GHG Intensity (kg CO2e/sq ft)"] + 'kg CO2e/sq ft');

        // Add the marker to the 2020 array.
        buildings2020.push(building2020);
        // Create a LAYER GROUP with the buildings2020 array
        var twenty = L.layerGroup(buildings2020);
    };
    layerControl.addOverlay(twenty, "2020");



    //   2021

    // Build 2021 array
    let buildings2021 = [];
    //Filter out only rows with DataYear = 2021
    var filtered2021 = response.filter(a => a.DataYear == 2021);

    // Loop through the 2021 array.
    for (let index = 0; index < filtered2021.length; index++) {
        let location = filtered2021[index];

        // For each building, create a marker, and bind a popup 
        let building2021 = L.circle([location.Latitude, location.Longitude], {
            radius: location["GHG Intensity (kg CO2e/sq ft)"] * 5,
            color: "#72b043"
        })
            .bindPopup("<h3>" + location.PropertyName + "<h3><h3>Address: " + location.Address + "</h3>" + location["GHG Intensity (kg CO2e/sq ft)"] + 'kg CO2e/sq ft');

        // Add the marker to the 2021 array.
        buildings2021.push(building2021);
        // Create a LAYER GROUP with the buildings2021 array
        var twenty1 = L.layerGroup(buildings2021);
    };
    layerControl.addOverlay(twenty1, "2021");

    // Build 2022 array
    let buildings2022 = [];
    //Filter out only rows with DataYear = 2022
    var filtered2022 = response.filter(a => a.DataYear == 2022);
    // Loop through the 2022 array.
    for (let index = 0; index < filtered2022.length; index++) {
        let location = filtered2022[index];

        // For each building, create a marker, and bind a popup 
        let building2022 = L.circle([location.Latitude, location.Longitude], {
            radius: location["GHG Intensity (kg CO2e/sq ft)"] * 5,
            color: "#007f4e"
        })
            .bindPopup("<h3>" + location.PropertyName + "<h3><h3>Address: " + location.Address + "</h3>" + location["GHG Intensity (kg CO2e/sq ft)"] + 'kg CO2e/sq ft');

        // Add the marker to the 2022 array.
        buildings2022.push(building2022);
        // Create a LAYER GROUP with the buildings2015 array
        var twenty2 = L.layerGroup(buildings2022);
    };
    layerControl.addOverlay(twenty2, "2022");


    //d3.json("chicagoNeighborhoods.geojson").then(function (data) {
    //  let neighborhoods = [];


    //  for (let index = 0; index < 10; index++) {

    //      let location = data.features[index].geometry;
    //      console.log(location);


    //      let neighborhood = L.polygon([location.coordinates], { fillColor: "black", fillOpacity: 0.9 })
    //          .bindPopup("<h3>" + 'Neighborhood: ' + data.features[index].properties.sec_neigh + "</h3>");
    //      console.log(neighborhood);
    //      neighborhoods.push(neighborhood);

    //      var areas = L.layerGroup(neighborhoods);
    // };

    //  layerControl.addOverlay(areas, "Neighborhood");
    // })
})