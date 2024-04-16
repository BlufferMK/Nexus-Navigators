import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import {ChakraProvider, theme} from "@chakra-ui/react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ErrorBoundary from "./Error";

const root = createRoot( document.getElementById('root'))
root.render(
    // <React.StrictMode>
    <ChakraProvider theme={theme}>
        <ErrorBoundary>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App/>}/>
                </Routes>

            </BrowserRouter>
        </ErrorBoundary>
    </ChakraProvider>,
    // </React.StrictMode>,
)

