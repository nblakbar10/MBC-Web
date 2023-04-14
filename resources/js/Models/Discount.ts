export interface baseDiscountModel {
    id?: number;
    name: string;
    promo_id: number;
    minimum_order: number;
    type: "Percentage" | "Absolute";
    deduction: number;
    quota: number;
}

export interface DiscountModel extends baseDiscountModel {
    id: number;
}

export interface DiscountCreateModel extends baseDiscountModel {

}
