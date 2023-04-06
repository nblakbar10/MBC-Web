import { EventModel } from "./Event";

export interface BasePromoModel {
    id?: number;
    promo_name: string;
    description: string;
    price: number;
    stocks: number;

    // event?: BaseEventPromoModel;
}

export interface PromoModel extends BasePromoModel {
    id: number;
    // event: BaseEventPromoModel;
}

export interface PromoCreateModel extends BasePromoModel {

}
