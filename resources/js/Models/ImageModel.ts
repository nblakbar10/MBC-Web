import { asset, Disk } from './Helper';

export type ImageType =
    | {
        path: string;
        disk: Disk;
    }
    | {
        file: File | undefined;
    };

export interface BaseImageModel {
    id?: number;

    path: string | undefined;
    disk: Disk | undefined;
    updated_at?: string | undefined;

    // should only be used for <input>
    file: File | undefined;

}

export interface ImageModel extends BaseImageModel {
    id: number;

    disk: Disk;
    path: string;
}

export interface NewImageModel extends BaseImageModel { }

export function getStorageImageUrl(image: BaseImageModel): string | undefined {
    if (image.file != null) {
        return URL.createObjectURL(image.file);
    } else if (image.path != null && image.disk != null) {
        return `${asset(image.disk, image.path)}`;
    }
}

export function createNewImageModel(): NewImageModel {
    return {
        path: undefined,
        disk: undefined,
        file: undefined,
    };
}
