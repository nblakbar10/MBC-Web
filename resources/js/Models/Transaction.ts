// Ntar stukturnya dirubah

export interface BaseTransactionModel{
    id?: number;
    amount: number;
    total_price: number;
    status: TransactionStatus;
} 

export interface TransactionModel extends BaseTransactionModel {
    id: number;
}

enum TransactionStatus {
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
}
