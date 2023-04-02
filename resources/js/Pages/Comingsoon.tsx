import { asset } from "@/Models/Helper";
import React from "react";

export default function Comingsoon() {
    return (
        <div className="flex flex-col items-center justify-center max-h-screen bg-gray-600">
            <img
                className="h-screen"
                src={asset('root', 'assets/images/COMMING-SOON.png')}
            />
        </div>
    );
}
