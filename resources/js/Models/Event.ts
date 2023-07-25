import { GeoTrackAble } from "./Helper";
import { NewImageModel } from "./ImageModel";
import { TicketTypeModel } from "./TicketType";

export interface BaseEventModel{
    id?: number;
    name: string;
    description: string;
    city : string;
    location: string;
    maximum_buy: number;
    start_date: string;
    end_date: string;
    poster_url: string;
    event_map_url: string;
    preview_url: string;
    ticket_types?: TicketTypeModel[];
}

export interface EventModel extends BaseEventModel {
    id: number;
}

export interface EventCreateModel extends BaseEventModel, GeoTrackAble{
    poster: NewImageModel;
    event_map: NewImageModel;
    preview: NewImageModel;
}
