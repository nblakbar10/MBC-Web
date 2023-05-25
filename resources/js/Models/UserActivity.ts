import { User } from "@/types";

export interface UserActivityModel {
    id: number;
    activity: string;
    latitude: number;
    longitude: number;
    created_at: string;
    user?: User;
}
