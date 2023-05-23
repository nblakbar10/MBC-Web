import { EventModel } from "./Event";

export interface BaseTicketTypeModel {
    id?: number;
    name: string;
    price: number;
    stocks: number;
    event: EventModel;
}

export interface TicketTypeModel extends BaseTicketTypeModel {
    id: number;
}

export interface TicketTypeCreateModel extends BaseTicketTypeModel {

}
