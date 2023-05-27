import { TicketTypeModel } from "./TicketType";
import { TransactionModel } from "./Transaction";

export interface RedeemHistoryModel {
    id: number;
    user_id: number;
    transaction_id: number;
    amount: number;
    latitude: number;
    longitude: number;
    created_at: string;
    transaction?: TransactionModel;
    ticketType?: TicketTypeModel;
}
