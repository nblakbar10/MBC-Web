import AppLayout from "@/Layouts/AppLayout";
import React from "react";
import Carousel from 'react-material-ui-carousel'
import ZoomableImage from "@/Components/ZoomableImage";
import { InertiaLink } from "@inertiajs/inertia-react";
import route from "ziggy-js";
import { EventModel } from "@/Models/Event";

interface Props {
    events: EventModel[];
}

export default function Home(props: Props) {
    const events = props.events;
    return (
        <AppLayout>
            <div className="flex flex-col gap-3 max-w-full h-auto mb-auto">
                <div className="bg-amber-50">
                    <div className="flex justify-center m-auto md:m-0 md:w-full">
                        <div className={`w-5/6 p-5 ${events.length > 0 ? "" : "h-96 mt-32"}`} >
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
                                    events.length > 0 ? (
                                        events.map((item, i) =>
                                            <div className=" rounded-2xl" key={i}>
                                                <ZoomableImage
                                                    className="w-full h-1/3  xl:h-[45rem] 2xl:h-[55rem] object-cover rounded-2xl"
                                                    img={item.preview_url}
                                                    title={item.name}
                                                    onChange={() => { }}
                                                />
                                            </div>
                                        )
                                    ) : (
                                        <div className="flex justify-center">
                                            <div className="text-3xl font-bold">Tidak Ada Event</div>
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
                            {events.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
                                    {events.map((item, i) => (
                                        <div className="flex justify-center rounded-2xl border-2 shadow-md" key={i}>
                                            <div className="flex flex-col gap-3 w-full">
                                                <ZoomableImage
                                                    className="w-full h-40 object-cover rounded-t-2xl"
                                                    img={item.preview_url}
                                                    title={item.name}
                                                    onChange={() => { }}
                                                />
                                                <div className="flex flex-col gap-3 px-5">
                                                    <div className="text-2xl ">{item.name}</div>
                                                    <div className="text-md text-gray-700">Mulai {new Date(item.start_date).toLocaleDateString("id") + '-' + new Date(item.end_date).toLocaleTimeString("id")}</div>
                                                    <div className="text-md text-gray-700">Selesai {new Date(item.end_date).toLocaleDateString("id") + '-' + new Date(item.start_date).toLocaleTimeString("id")}</div>
                                                    <div className="flex justify-center border-t-2 my-2">
                                                        <InertiaLink
                                                            href={route('visitor.event-detail', item.id)}
                                                            className="bg-gray-700 text-white rounded-full px-4 py-2 my-3 hover:bg-gray-500">
                                                            Buy Ticket
                                                        </InertiaLink>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex justify-center">
                                    <div className="text-2xl font-bold">Tidak Ada Event</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
