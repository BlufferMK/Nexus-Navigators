import React, {useEffect, useRef, useState} from "react";
import {Box, Select,} from "@chakra-ui/react";
import * as d3 from "d3";
import {Heading, Text} from "@chakra-ui/layout";

/**
 * Comparison of Electricity vs Natural gas usage by building built year
 */
const Chart3 = ({data}) => {
    const ref = useRef();


    const [selectedType, setSelectedType] = useState("Multifamily Housing")

    useEffect(() => {
        if (data.length === 0) return;

        // Set dimensions and scales
        const margin = {top: 20, right: 20, bottom: 100, left: 60};
        const width = 800 - margin.left - margin.right;
        const height = 600 - margin.top - margin.bottom;

        const processedData = data
            .filter(d => d["Primary Property Type"] === selectedType)
            .filter(d => d["Data Year"] && d["Weather Normalized Site EUI (kBtu\/sq ft)"])
            .map(d => ({
                year: d["Data Year"],
                eui: d["Weather Normalized Site EUI (kBtu\/sq ft)"]
            }))

        // Group data by decade and sum up usages
        const averageData = d3.groups(processedData, d => d.year)
            .map(([year, values]) => ({
                year,
                eui: d3.mean(values, d => d.eui)
            }))
            .sort((a,b) => a.year-b.year);
            

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
            .domain(averageData.map(d => d.year))
            .padding(0.2);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        // Y axis
        const y = d3.scaleLinear()
            .domain([d3.min(averageData, d => d.eui)-5, d3.max(averageData, d => d.eui)])
            .range([height, 0]);

        svg.append("g")
            .call(d3.axisLeft(y));

        svg.selectAll("bars")
            .data(averageData)
            .enter()
            .append("rect")
            .attr("x", d => x(d.year))
            .attr("y", d => y(d.eui))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.eui))
            .attr("fill", "#69b3a2");

        svg.append("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 20)
            .attr("x", -margin.top - height / 2 + 200)
            .text("Average Weather Normalized Site EUI (kBtu\/sq ft)"); // Text of the label

        svg.append("text")
            .attr("text-anchor", "end")
            .attr("x", width / 2 + 30) // Center the text by setting it to half the width
            .attr("y", height + margin.bottom - 50) // Position below the X-axis by 20 units from the bottom margin
            .text("Calendar Year"); // Text of the label

    }, [data, selectedType]); // Dependency array to trigger rerender on data change

    return <Box>
        <Heading size='md' textAlign={'center'} p={5}>
            Average EUI by Year
        </Heading>
        <svg ref={ref}/>

        <Text p={3} align={"center"}>
            Property type
        </Text>
        <Select defaultValue={"Multifamily Housing"}
                onChange={(e) => {
                    setSelectedType(e.target.value)
                }}>

            {data.length > 1 && d3.groups(data.filter(d => d["Primary Property Type"]), d => d["Primary Property Type"])
                .map(([type, values]) =>
                    <option value={type}>{type}</option>
                )
            }

        </Select>
    </Box>
}


export default Chart3;
