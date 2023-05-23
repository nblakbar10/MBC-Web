export interface BaseTicketDiscountModel {
    id?: number;
    name: string;
    promo_id: number;
    minimum_order: number;
    type: "Percentage" | "Fixed";
    deduction: number;
    quota: number;
}

export interface TicketDiscountModel extends BaseTicketDiscountModel {
    id: number;
}

export interface TicketDiscountCreateModel extends BaseTicketDiscountModel {

}
