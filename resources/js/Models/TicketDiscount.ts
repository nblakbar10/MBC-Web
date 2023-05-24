import { TicketTypeModel } from "./TicketType";

export interface BaseTicketDiscountModel {
    id?: number;
    name: string;
    stock: number;
    amount: number;
    minimum_buy: number;
    type: "fixed" | "percentage";
    ticket_type_id: number
    ticketType?: TicketTypeModel;
}

export interface TicketDiscountModel extends BaseTicketDiscountModel {
    id: number;
}

export interface TicketDiscountCreateModel extends BaseTicketDiscountModel {

}
