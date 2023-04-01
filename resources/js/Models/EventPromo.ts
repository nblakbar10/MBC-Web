import { EventModel } from "./Event";

export interface BaseEventPromoModel {
    id?: number;
    name: string;
    event?: BaseEventPromoModel;
}

export interface EventPromoModel extends BaseEventPromoModel {
    id: number;
    event: BaseEventPromoModel;
}

export interface EventPromoCreateModel extends BaseEventPromoModel {

}
