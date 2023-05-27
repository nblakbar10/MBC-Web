import AppLayout from "@/Layouts/AppLayout";
import React from "react";
import Carousel from 'react-material-ui-carousel'
import ZoomableImage from "@/Components/ZoomableImage";

export default function Home() {
    const events = [
        {
            name: "Random Name #1",
            price: "Rp. 100.000",
            date: "12-12-2021 - 12-12-2021",
            image: "https://w.wallhaven.cc/full/kx/wallhaven-kxkze7.jpg"
        },{
            name: "Random Name #2",
            price: "Rp. 100.000",
            date: "12-12-2021 - 12-12-2021",
            image: "https://w.wallhaven.cc/full/3l/wallhaven-3l3pq3.png"
        }, {
            name: "Random Name #3",
            price: "Rp. 100.000",
            date: "12-12-2021 - 12-12-2021",
            image: "https://w.wallhaven.cc/full/jx/wallhaven-jxeopw.jpg"
        }, {
            name: "Random Name #4",
            price: "Rp. 100.000",
            date: "12-12-2021 - 12-12-2021",
            image: "https://w.wallhaven.cc/full/1p/wallhaven-1pp7pv.jpg"
        }, {
            name: "Random Name #5",
            price: "Rp. 100.000",
            date: "12-12-2021 - 12-12-2021",
            image: "https://w.wallhaven.cc/full/gp/wallhaven-gp8lpd.jpg"
        }, {
            name: "Random Name #6",
            price: "Rp. 100.000",
            date: "12-12-2021 - 12-12-2021",
            image: "https://w.wallhaven.cc/full/7p/wallhaven-7ppwgy.jpg"
        }, {
            name: "Random Name #7",
            price: "Rp. 100.000",
            date: "12-12-2021 - 12-12-2021",
            image: "https://w.wallhaven.cc/full/z8/wallhaven-z8lqjv.jpg"
        }, {
            name: "Random Name #8",
            price: "Rp. 100.000",
            date: "12-12-2021 - 12-12-2021",
            image: "https://w.wallhaven.cc/full/kx/wallhaven-kx75k7.jpg"
        }
    ];
    return (
        <AppLayout>
            <div className="flex flex-col gap-3 max-w-full">
                <div className="bg-amber-50">
                    <div className="flex justify-center m-auto md:m-0 md:w-full">
                        <div className="w-5/6 p-5">
                            <Carousel
                                autoPlay={true}
                                animation="slide"
                                navButtonsAlwaysVisible={true}
                                navButtonsProps={{
                                    style: {
                                        backgroundColor: 'transparent',
                                        color: '#494949',
                                        borderRadius: 0,
                                        margin: 0,
                                        width: 30,
                                        height: 30,
                                        padding: 0,
                                        zIndex: 1000
                                    }
                                }}
                                indicatorContainerProps={{
                                    style: {
                                        marginTop: '-5', // 5
                                        textAlign: 'center', // 4
                                        zIndex: '1000'
                                    }

                                }}
                                NextIcon={
                                    <button
                                        className="bg-opacity-25 bg-gray-700 rounded-full px-4 mr-7 font-mono"
                                    >
                                        {">"}
                                    </button>
                                }
                                PrevIcon={
                                    <button
                                        className="bg-opacity-25 bg-gray-700 rounded-full px-4 ml-7 font-mono"
                                    >
                                        {"<"}
                                    </button>
                                }
                            >

                                {
                                    events.map((item, i) =>
                                        <div className=" rounded-2xl">
                                            <ZoomableImage
                                                className="w-full h-1/3  xl:h-[45rem] 2xl:h-[55rem] object-cover rounded-2xl"
                                                img={item.image}
                                                title={item.name}
                                                onChange={() => { }}
                                            />
                                        </div>
                                    )
                                }
                            </Carousel>
                        </div>
                    </div>
                </div>
                <div className="bg-white">
                    <div className="flex justify-center m-auto md:m-0 md:w-full">
                        <div className="w-5/6 p-5 flex flex-col gap-5">
                            <div className="text-2xl font-bold">
                                <div className="flex justify-center">Event Terbaru</div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
                                {events.map((item, i) => (
                                    <div className="flex justify-center rounded-2xl border-2 shadow-md">
                                        <div className="flex flex-col gap-3 w-full">
                                            <ZoomableImage
                                                className="w-full h-40 object-cover rounded-t-2xl"
                                                img={item.image}
                                                title={item.name}
                                                onChange={() =>{}}
                                            />
                                            <div className="flex flex-col gap-3 px-5">
                                                <div className="text-2xl ">{item.name}</div>
                                                <div className="text-md text-gray-700">{item.date}</div>
                                                <div className="text-xl font-extrabold">{item.price}</div>
                                                <div className="flex justify-center border-t-2 my-2">
                                                    <button className="bg-gray-700 text-white rounded-full px-4 py-2 my-3 font-mono">Buy Ticket</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
