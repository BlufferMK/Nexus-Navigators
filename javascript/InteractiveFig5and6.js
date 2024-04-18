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

        // set the dimensions and margins of the graph
        var margin = { top: 10, right: 30, bottom: 30, left: 50 },
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = d3.select("#my_dataviz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
        // Create the X axis:
        // Create a list of the years that we will use as our x axis
        var years = [2016, 2017, 2018, 2019, 2020, 2021, 2022];

        // Set the domain of the x-axis scale to be the years
        x.domain(years);

        // Set the domain of the y-axis scale to be from 5 to 25
        y.domain([5, 25]);

        // setup the layout of the Greenhouse Gas chart
        var layout = { title: "Median Greenhouse Gas Emission Index by Sector", xaxis: { title: "Year" }, yaxis: { title: "kg CO2e per sq ft" } }

        // plot the Greenhouse Gas chart
        var GHGplot = [College, Health, School, Office, Lodging, Multifamily, Other, Retail];
        Plotly.newPlot('my_dataviz', GHGplot, layout);

        // Create a function that takes a dataset as input and update the plot:
        function update(data) {




            // Create an update selection: bind to the new data
            var u = svg.selectAll(".lineTest")
                .data([data], function (d) { return d.ser1 });

            // Update the line
            u
                .enter()
                .append("path")
                .attr("class", "lineTest")
                .merge(u)
                .transition()
                .duration(3000)
                .attr("d", d3.line()
                    .x(function (d) { return x(d.ser1); })
                    .y(function (d) { return y(d.ser2); }))
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 2.5)
        }

        // At the beginning, I run the update function on the first dataset:


    })
update(College)