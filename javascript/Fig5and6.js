// fetch data 
fetch("output/fig5and6.json")
    .then((response) => response.json())
    .then((data) => {
        console.log(data); // Access the data inside this block

        // create a list of years from the json for using as xlabel for plots
        var years = [data[14][0], data[22][0], data[30][0], data[38][0], data[46][0], data[54][0], data[62][0]];

        //var labels = [data[0][0], data[1][0], data[2][0], data[3][0], data[4][0], data[5][0], data[6][0], data[7][0]]

        // Greenhouse Gas Emissions Plot

        // Create empty lists for Greenhouse Gas Intensity values by Sector
        var GHGIntensityCollege = [];
        var GHGIntensityHealthcare = [];
        var GHGIntensitySchools = [];
        var GHGIntensityLodging = [];
        var GHGIntensityMultifamily = [];
        var GHGIntensityOffice = [];
        var GHGIntensityOther = [];
        var GHGIntensityRetail = [];

        // Setup the empty lists to hold the data by sector for EUI
        var EUICollege = [];
        var EUIHealthcare = [];
        var EUISchools = [];
        var EUILodging = [];
        var EUIMultifamily = [];
        var EUIOffice = [];
        var EUIOther = [];
        var EUIRetail = [];

        // populate lists for Greenhouse Gas Intensity values by Sector with a for loop
        for (let i = 14; i < 70; i++) {
            if (data[i][1] == "College/University") {
                GHGIntensityCollege.push(data[i][6]);
                EUICollege.push(data[i][4]);
            } else if (data[i][1] == "Healthcare") {
                GHGIntensityHealthcare.push(data[i][6]);
                EUIHealthcare.push(data[i][4]);
            } else if (data[i][1] == "K-12 Schools") {
                GHGIntensitySchools.push(data[i][6]);
                EUISchools.push(data[i][4]);
            } else if (data[i][1] == "Lodging") {
                GHGIntensityLodging.push(data[i][6]);
                EUILodging.push(data[i][4]);
            } else if (data[i][1] == "Multifamily Housing") {
                GHGIntensityMultifamily.push(data[i][6]);
                EUIMultifamily.push(data[i][4]);
            } else if (data[i][1] == "Office") {
                GHGIntensityOffice.push(data[i][6]);
                EUIOffice.push(data[i][4]);
            } else if (data[i][1] == "Other") {
                GHGIntensityOther.push(data[i][6]);
                EUIOther.push(data[i][4]);
            } else if (data[i][1] == "Retail") {
                GHGIntensityRetail.push(data[i][6]);
                EUIRetail.push(data[i][4]);
            };
        };

        // Create the plotting variables for the different sectors - one line per sector
        var College = {
            x: years,
            y: GHGIntensityCollege,
            name: "College/University",
            type: 'scatter'
        };
        var Health = {
            x: years,
            y: GHGIntensityHealthcare,
            name: "Healthcare",
            type: 'scatter'
        };
        var School = {
            x: years,
            y: GHGIntensitySchools,
            name: "K-12 Schools",
            type: 'scatter'
        };
        var Lodging = {
            x: years,
            y: GHGIntensityLodging,
            name: "Lodging",
            type: 'scatter'
        };
        var Multifamily = {
            x: years,
            y: GHGIntensityMultifamily,
            name: "Multifamiliy",
            type: 'scatter'
        };
        var Office = {
            x: years,
            y: GHGIntensityOffice,
            name: "Office",
            type: 'scatter'
        };
        var Other = {
            x: years,
            y: GHGIntensityOther,
            name: "Other",
            type: 'scatter'
        };
        var Retail = {
            x: years,
            y: GHGIntensityRetail,
            name: "Retail",
            type: 'scatter'
        };

        // setup the layout of the Greenhouse Gas chart
        var layout = { title: "Median Greenhouse Gas Emission Index by Sector", xaxis: { title: "Year" }, yaxis: { title: "kg CO2e per sq ft" } }

        // plot the Greenhouse Gas chart
        var GHGplot = [College, Health, School, Office, Lodging, Multifamily, Other, Retail];
        Plotly.newPlot('myDiv', GHGplot, layout);

        // EUI Plot
        var CollegeEUI = {
            x: years,
            y: EUICollege,
            name: "College/University",
            type: 'scatter'
        };
        var HealthEUI = {
            x: years,
            y: EUIHealthcare,
            name: "Healthcare",
            type: 'scatter'
        };
        var SchoolEUI = {
            x: years,
            y: EUISchools,
            name: "K-12 Schools",
            type: 'scatter'
        };
        var LodgingEUI = {
            x: years,
            y: EUILodging,
            name: "Lodging",
            type: 'scatter'
        };
        var MultifamilyEUI = {
            x: years,
            y: EUIMultifamily,
            name: "Multifamiliy",
            type: 'scatter'
        };
        var OfficeEUI = {
            x: years,
            y: EUIOffice,
            name: "Office",
            type: 'scatter'
        };
        var OtherEUI = {
            x: years,
            y: EUIOther,
            name: "Other",
            type: 'scatter'
        };
        var RetailEUI = {
            x: years,
            y: EUIRetail,
            name: "Retail",
            type: 'scatter'
        };

        // setup the layout of the Greenhouse Gas chart
        var layoutEUI = { title: "Median Energy Use by Sector", xaxis: { title: "Year" }, yaxis: { title: "kBtu per sq ft" } }

        // Make the EUI plot

        var EUIplot = [CollegeEUI, HealthEUI, SchoolEUI, LodgingEUI, MultifamilyEUI, OfficeEUI, OtherEUI, RetailEUI];
        Plotly.newPlot('energyDiv', EUIplot, layoutEUI);
    })