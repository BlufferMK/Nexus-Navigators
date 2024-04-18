import React, {useRef, useEffect, useState} from "react";
import {Box, Select, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack} from "@chakra-ui/react";
import * as d3 from "d3";
import {sortBy} from "lodash";
import {Heading, Text} from "@chakra-ui/layout";

/*
 * Energy score rating distribution by number of properties
 */
 

const Chart1 = ({data}) => {

// Function for setting and updating the initial values 
    const [yearRange, setYearRange] = useState([])
    const [selectedYearMax, setSelectedYearMax] = useState(undefined)

    const ref = useRef(null);
    const [selectedType, setSelectedType] = useState("Multifamily Housing")

    useEffect(() => {

        if (data.length === 0) return;


        const filteredData = data.filter(d=>d["Primary Property Type"] === selectedType)
        const sortedData = sortBy(filteredData, it => it["Data Year"])
        const yearMin = sortedData[0]["Data Year"]
        const yearMax = sortedData[sortedData.length - 1]["Data Year"]
        setYearRange([yearMin, yearMax])

        if(!selectedYearMax){
            setSelectedYearMax(yearMax)
        }
        // Function to calculate median
        const median = (values) => {
            const sorted = values.sort(d3.ascending);
            const middle = Math.floor(sorted.length / 2);
            if (sorted.length % 2 === 0) {
                return (sorted[middle - 1] + sorted[middle]) / 2;
            }
            return sorted[middle];
        };

        // Process data to get median scores by year
        const medianScores = d3.groups(filteredData.filter(s => s["ENERGY STAR Score"]), d => d["Data Year"])
            .map(([year, values]) => ({
                year: year,
                score: median(values.map(d => d["ENERGY STAR Score"])),
                count: values.length
            }));



        medianScores.sort((a, b) => d3.ascending(a.year, b.year));
        const scores = medianScores.filter(b => b.year <= selectedYearMax ?? yearMax)

        // Set dimensions and scales
        const margin = {top: 20, right: 20, bottom: 30, left: 40};
        const width = 800 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const x = d3.scaleBand()
            .range([0, width])
            .padding(0.1)
            .domain(scores.map(d => d.year));

        const y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(scores, d => d.score)]);

        // Clear previous contents
        d3.select(ref.current).selectAll("*").remove();

        // Select the svg element, if it exists
        const svg = d3.select(ref.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Create the bars
        svg.selectAll(".bar")
            .data(scores)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.year))
            .attr("width", x.bandwidth())
            .attr("y", d => y(d.score))
            .attr("height", d => height - y(d.score));

        // Add median score text above each bar
        svg.selectAll(".label")
            .data(scores)
            .enter().append("text")
            .attr("class", "label")
            .attr("x", d => x(d.year) + x.bandwidth() / 2)
            .attr("y", d => y(d.score) - 5)
            .attr("text-anchor", "middle")
            .text(d => d.score);

        // Add the x-axis
        const xAxisGroup = svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x))

        // Append count text under the year label
        xAxisGroup.selectAll("g.tick")
            .append("text")
            .attr("text-anchor", "middle")
            .attr("x", 0)
            .attr("y", -20)
            .attr("fill", "#FFFFFF")
            .text((d, i) => `n=${scores[i].count}`);

        // Add the y-axis
        svg.append("g")
            .call(d3.axisLeft(y));

    }, [selectedType, data, selectedYearMax]);

    return (
        <Box p={5}>
            <Heading size='md' textAlign={'center'} p={5}>
                Median ENERGY STAR Score by Year
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

            {yearRange.length === 2 && selectedYearMax && <Slider
                min={yearRange[0]}
                max={yearRange[1]}
                defaultValue={yearRange[1]}
                aria-label='slider-ex-6'
                onChange={e => {
                    setSelectedYearMax(e)
                }}
            >
                {
                    Array.from({length: yearRange[1] - yearRange[0] + 1},
                        (_, index) => yearRange[0] + index).map(year => (
                            <SliderMark
                                key={year}
                                value={year}
                                mt="1"
                                ml="-2.5"
                                fontSize="sm"
                            >
                                {year}
                            </SliderMark>
                        )
                    )
                }
                <SliderTrack
                    defaultValue={82}
                >
                    <SliderFilledTrack
                        defaultValue={82}
                    />
                </SliderTrack>
                <SliderThumb
                    defaultValue={82}
                />
            </Slider>
            }
        </Box>
    );
};

export default Chart1;
