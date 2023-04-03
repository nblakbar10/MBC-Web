import { asset } from "@/Models/Helper";
import { Head } from "@inertiajs/inertia-react";
import React from "react";

export default function Comingsoon() {
    return (
        <>
            <Head  >
                {/* <title>Coming Soon</title> */}
                <link rel="icon" type="image/svg+xml" href={asset('root', 'assets/images/Icon-MBC.JPG')} />
                <meta name="description" content="MBC Entertainment" />
            </Head>
            
            <div className="flex flex-col items-center justify-center max-h-screen bg-gray-600">
                <img
                    className="h-screen object-contain"
                    src={asset('root', 'assets/images/90FDE582-72A7-40B4-842C-BFBA5E3EB1F6.PNG')}
                    alt="Coming Soon"
                />
            </div>
        </>
    );
}
