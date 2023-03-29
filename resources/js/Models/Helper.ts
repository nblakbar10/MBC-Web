import { nanoid } from 'nanoid';
import { Key } from 'react';

// create unique key from id or (if id is undefined ) nanoid()
export function createKey(id: Key | undefined = undefined): Key {
    if (id == undefined) {
        return nanoid();
    } else {
        return id;
    }
}

// @ts-ignore
const ASSET: string = window.LARAVEL_ASSET_URL.replace(/\/$/, '');
export type Disk = 'root' | 'public';

export function asset(disk: Disk, link: string) {
    if (disk == 'public') {
        return `${ASSET}/storage/${link}`;
    } else if (disk == 'root') {
        return `${ASSET}/${link}`;
    }
}

interface Keyable {
    id?: Key;
    __unique_key?: Key;
}
export function getUniqueKey(item: Keyable) {
    if (item.id != null) {
        return item.id;
    } else {
        if (item.__unique_key != null) {
            return item.__unique_key;
        }
        item.__unique_key = nanoid();

        return item.__unique_key;
    }
}
