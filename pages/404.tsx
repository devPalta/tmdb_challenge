import { Button } from "@chakra-ui/react";
import Link from "next/link";

export default function FourOhFour() {
    return (
        <>
            <h1>404 - Page Not Found</h1>
            <Button>
                <Link href="/">Go back home</Link>
            </Button>
        </>
    );
}
