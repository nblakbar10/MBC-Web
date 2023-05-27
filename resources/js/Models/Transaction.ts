// Ntar stukturnya dirubah

import { TicketDiscountModel } from "./TicketDiscount";
import { TicketTypeModel } from "./TicketType";

export interface BaseTransactionModel{
    id?: number;
    name: string;
    email: string;
    phone_number: string;
    ticket_amount: number;
    total_price: number;
    buy_date: string;
    pay_date: string;
    payment_method: string;
    payment_status: string;
    payment_link: string;
    external_id: string;
    ticket_id?: string;
    ticket_status?: string;
    ticket_barcode_url?: string;
    redeemed_amount : number;
    created_at: string;
    updated_at: string;
    ticketType?: TicketTypeModel;
    ticketDiscounts? : Array<TicketDiscountModel>;
} 

export interface TransactionModel extends BaseTransactionModel {
    id: number;
}
