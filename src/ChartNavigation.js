import React, {useRef, useEffect, useState} from "react";
import {
    Box,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs
} from "@chakra-ui/react";
import Chart1 from "./charts/Chart1";
import Chart2 from "./charts/Chart2";
import Chart3 from "./charts/Chart3";

const ChartNavigation = ({data}) => {
    return (
        <Box p={5}>
            <Tabs isFitted variant='enclosed'>
                <TabList>
                    <Tab>Chart 1</Tab>
                    <Tab>Chart 2</Tab>
                    <Tab>Chart 3</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Chart1 data={data}/>
                    </TabPanel>
                    <TabPanel>
                        <Chart2 data={data}/>
                    </TabPanel>
                    <TabPanel>
                        <Chart3 data={data}/>
                    </TabPanel>
                
        
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default ChartNavigation;
