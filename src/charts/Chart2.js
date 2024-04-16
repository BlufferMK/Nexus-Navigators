import React, {useEffect, useRef} from "react";
import {Box,} from "@chakra-ui/react";
import * as d3 from "d3";
import {Heading} from "@chakra-ui/layout";

/**
 * Comparison of Electricity vs Natural gas usage by building built year
 */
const Chart3 = ({data}) => {
    const ref = useRef();

    useEffect(() => {
        if (data.length === 0) return;

        // Process data to calculate proportions by year
        const allData = data
            .filter(d => d["Year Built"])
            .filter(d => d["Year Built"]>=2000)
            .map(d => {
                return ({
                    decade: d["Year Built"],
                    electric: d["Electricity Use (kBtu)"] || 1,
                    gas: d["Natural Gas Use (kBtu)"] || 1
                });
            })

        // Group data by decade and sum up usages
        const summedData = d3.groups(allData, d => d.decade)
            .map(([decade, values]) => ({
                decade,
                electric: d3.sum(values, d => d.electric),
                gas: d3.sum(values, d => d.gas),
                count: values.length
            }));

        // Process data to calculate proportions by decade
        const processedData = summedData.map(d => ({
            decade: d.decade,
            electric: (d.electric / (d.electric + d.gas)) * 100,
            gas: (d.gas / (d.electric + d.gas)) * 100,
            count: d.count
        })).sort((a, b) => a.decade - b.decade);


        // Set dimensions and scales
        const margin = {top: 20, right: 20, bottom: 100, left: 60};
        const width = 800 - margin.left - margin.right;
        const height = 600 - margin.top - margin.bottom;

        // Clear previous contents
        d3.select(ref.current).selectAll("*").remove();

        // Append the svg object to the body of the page
        const svg = d3.select(ref.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // X axis
        const x = d3.scaleBand()
            .range([0, width])
            .domain(processedData.map(d => d.decade))
            .padding(0.2);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        // Y axis
        const y = d3.scaleLinear()
            .domain([0, 100])
            .range([height, 0]);


        // Bars for Electricity
        svg.selectAll(".bar.electric")
            .data(processedData)
            .enter()
            .append("rect")
            .attr("class", "bar electric")
            .attr("x", d => x(d.decade))
            .attr("y", d => y(d.electric))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.electric))
            .attr("fill", "#ffa200");

        // Bars for Natural Gas
        svg.selectAll(".bar.gas")
            .data(processedData)
            .enter()
            .append("rect")
            .attr("class", "bar gas")
            .attr("x", d => x(d.decade))
            .attr("y", d => y(d.electric + d.gas))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.gas))
            .attr("fill", "#00a2ff");

        svg.append("g")
            .call(d3.axisLeft(y));

        svg.append("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 20)
            .attr("x", -margin.top - height / 2 + 80)
            .text("Fuel Usage Proportion (%)"); // Text of the label

        svg.append("text")
            .attr("text-anchor", "end")
            .attr("x", width / 2 + 30) // Center the text by setting it to half the width
            .attr("y", height + margin.bottom - 25) // Position below the X-axis by 20 units from the bottom margin
            .text("Year Built"); // Text of the label

    }, [data]); // Dependency array to trigger rerender on data change

    return <Box>
        <Heading size='md' textAlign={'center'} p={5}>
            Fuel Type Usage Proportion by Years
        </Heading>
        <svg ref={ref}/>
    </Box>
}


export default Chart3;
