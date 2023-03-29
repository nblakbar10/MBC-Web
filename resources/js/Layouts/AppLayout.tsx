import React from "react";

interface Props {
    children: React.ReactNode;
}

export default function AppLayout({children }: Props) {
    return (
        <div className="min-h-screen bg-orange-100 flex flex-col">
            <nav className="flex w-full sticky bg-orange-400 p-5">
                <div className="text-3xl md:ml-20 bg-orange-700 text-white px-10 py-2">
                        Logo
                    </div>
            </nav>
            {children}
            <div className="w-full h-60  bg-amber-800">
            </div>
        </div >
    );
}
