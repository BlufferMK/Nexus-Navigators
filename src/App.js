import {
    Box,
    
    Flex,
    
    
    
} from '@chakra-ui/react'
import React, {useEffect, useState} from 'react'
import "leaflet/dist/leaflet.css";
import * as d3 from "d3";
import ChartNavigation from "./ChartNavigation";

const filePath = '/data.json';
const App = () => {

    const [data, setData] = useState([])
    



    useEffect(() => {
        d3.json(filePath).then(data => {
            setData(data)
        });
    }, []);




    return (
        <Flex
            position='relative'
            flexDirection='column'
            alignItems='center'
            h='100vh'
            w='100vw'
        >
            <Box
                position="absolute"
                p={4}
                m={4}
                borderRadius='lg'
                bgColor='white'
                shadow='base'
                minW='container.md'
                // zIndex='1'
            >
                {data.length > 0 && <ChartNavigation data={data}/>}
        
            </Box>
        </Flex>
    )
}

export default App
