import * as React from "react";

import {Text} from "@chakra-ui/layout";
import {HStack} from "@chakra-ui/react";
import {FaSadCry} from "react-icons/fa";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/modal";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return {hasError: true};
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <Modal onClose={() => {
            }} isOpen={true}>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(10px) hue-rotate(90deg)'
                />
                <ModalContent>
                    <ModalHeader>
                        <HStack justifyContent='space-between'>
                            <Text>
                                Oops!
                            </Text>
                            <FaSadCry/>
                        </HStack>
                    </ModalHeader>

                    <ModalBody>
                        <HStack>
                            <Text>
                               Something is broken, please reload
                            </Text>
                        </HStack>
                    </ModalBody>
                    <ModalFooter>

                    </ModalFooter>
                </ModalContent>
            </Modal>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary
