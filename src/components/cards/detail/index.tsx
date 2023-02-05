import React from "react";
import Image from "next/image";

export const Logo: React.FC = () => {
    return (
        <Image
            src="/icons/tmdb_logo.svg"
            alt="nextjs"
            width="500"
            height="40"
        />
    );
};
