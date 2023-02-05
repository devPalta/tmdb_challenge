import { Button, Center, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { WarningTwoIcon } from "@chakra-ui/icons";

const FourOhFour: React.FC = () => {
    return (
        <Flex
            flex={1}
            flexDir="column"
            justifyContent="space-between"
            minH="75vh"
        >
            <Center>
                <WarningTwoIcon fontSize={75} />
            </Center>
            <Center>
                <Heading>404 - Page Not Found</Heading>
            </Center>
            <Button>
                <Link href="/">Go back home</Link>
            </Button>
        </Flex>
    );
};

export default FourOhFour;
