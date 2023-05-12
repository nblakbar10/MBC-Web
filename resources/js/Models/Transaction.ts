// Ntar stukturnya dirubah

export interface BaseTransactionModel{
    id?: number;
    name: string;
    email: string;
    phone_number: string;
    total_tickets: number;
    tickets_category: string;
    total_amount: number;
    payment_method: string;
    payment_status: string;
    payment_link: string;
    ticket_id?: string;
    ticket_status?: string;
    ticket_barcode?: string;
    redeem_amount : number;
    created_at: string;
    updated_at: string;
} 

export interface TransactionModel extends BaseTransactionModel {
    id: number;
}

enum TransactionStatus {
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
}
