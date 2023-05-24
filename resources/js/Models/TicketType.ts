import { EventModel } from "./Event";

export interface BaseTicketTypeModel {
    id?: number;
    name: string;
    price: number;
    stock: number;
    maximum_buy?: number;
    event?: EventModel;
}

export interface TicketTypeModel extends BaseTicketTypeModel {
    id: number;
}

export interface TicketTypeCreateModel extends BaseTicketTypeModel {
    event_id: number;
}
