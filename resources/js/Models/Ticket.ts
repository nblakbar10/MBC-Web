export interface BaseTicketModel {
    id?: number;
    external_id: string;
    ticket_id: string;
    ticket_name: string;
    email: string;
    phone_number: string;
    ticket_qty: number;
    ticket_category: string;
    ticket_status: string;
}

export interface TicketModel extends BaseTicketModel {
    id: number;
}
