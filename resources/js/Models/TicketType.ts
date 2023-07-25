import { EventModel } from "./Event";
import { GeoTrackAble } from "./Helper";
import { TicketDiscountModel } from "./TicketDiscount";

export interface BaseTicketTypeModel {
    id?: number;
    name: string;
    price: number;
    fee: number;
    stock: number;
    maximum_buy?: number;
    event_id: number;
    event?: EventModel;
    ticket_discounts ?: TicketDiscountModel[];
}

export interface TicketTypeModel extends BaseTicketTypeModel {
    id: number;
}

export interface TicketTypeCreateModel extends BaseTicketTypeModel, GeoTrackAble {
    event_id: number;
}
