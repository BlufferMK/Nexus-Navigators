import {
    Box,
    Button,
    Flex,
    HStack,
    Select,
    Input, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerCloseButton, IconButton,
} from '@chakra-ui/react'
import React, {useEffect, useState} from 'react'
import "leaflet/dist/leaflet.css";
import {MapContainer, TileLayer} from 'react-leaflet'
import * as d3 from "d3";
import {FaRegMap} from "react-icons/fa";
import ChartNavigation from "./ChartNavigation";

const chicago = [41.85, -87.97];
const filePath = '/data.json';
const App = () => {

    const [data, setData] = useState([])
    const [years, setYears] = useState([])

    const [selectedYear, setSelectedYear] = useState(undefined)
    const [isSideOpen, setSideOpen] = useState(false)

    useEffect(() => {
        d3.json(filePath).then(data => {
            setData(data)
        });
    }, []);

    useEffect(() => {
        const districtYears = new Set(data.map(item => item["Data Year"]));
        setYears([...districtYears].sort());
    }, [data]);


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
                <HStack spacing={2} justifyContent='space-between'>
                    <IconButton
                        aria-label='center back'
                        icon={<FaRegMap/>}
                        isRound
                        onClick={() => {
                            setSideOpen(true)
                        }}
                    />
                </HStack>
                <Drawer
                    size='md'
                    isOpen={isSideOpen}
                    placement='bottom'
                    onClose={() => {
                        setSideOpen(false)
                    }}
                >
                    <DrawerOverlay>
                        <DrawerContent
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"  // Pushes content to top and bottom
                            alignItems="center"
                        >

                            <HStack
                                p={1}
                                bgColor='white'
                                borderRadius='lg'
                                position="absolute"
                                minW={"50%"}
                                zIndex={10000}
                                spacing={1}
                                justifyContent={'center'}
                            >

                                <Select placeholder='Select Year'
                                        onChange={(e) => {
                                            setSelectedYear(e.target.value)
                                        }}>
                                    {years.map(y => (
                                        <option key={y} value={y}>{y}</option>
                                    ))}
                                </Select>
                            </HStack>
                            <DrawerCloseButton
                                zIndex={10000}
                            />
                    
                        </DrawerContent>
                    </DrawerOverlay>

                </Drawer>
            </Box>
        </Flex>
    )
}

export default App
