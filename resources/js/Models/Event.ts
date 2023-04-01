import { BaseEventPromoModel} from "./EventPromo";

export interface BaseEventModel{
    id?: number;
    name: string;
    eventPromos?: BaseEventPromoModel[];
}

export interface EventModel extends BaseEventModel {
    id: number;
    eventPromos: BaseEventPromoModel[];
}

export interface EventCreateModel extends BaseEventModel {

}
