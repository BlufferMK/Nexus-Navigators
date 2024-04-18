// Create our first trace
var sum_data = fetch("piechart.json").then((response) => response.json());
console.log(sum_data);

let sector_areas_2022 = sum_data["Office"];
console.log(sector_areas_2022);







var data = [{
    values: [0, 1, 2, 3, 4, 5],
    labels: ['a','b','c','d','e'],
    type: "pie"
}];

let layout = {
    height: 400,
    width: 500
};

// The data array consists of both traces
//let data = [trace1, trace2];

// Note that we omitted the layout object this time
// This will use default parameters for the layout
Plotly.newPlot("plot", data, layout);
