import { asset, Disk } from "./Helper"

export interface BaseDocumentFileModel{
    path?: string,

    // for input only
    file?: File
    disk: Disk,
    url?: string,
    updated_at?: string,

    __isOpened: boolean,
}

export interface DocumentFileModel extends BaseDocumentFileModel { 
    id: number,
    disk: Disk,
    path: string,
}

export function getStorageFileUrl(documentFile: DocumentFileModel | BaseDocumentFileModel): string | undefined {
    if (documentFile.file) {
        return URL.createObjectURL(documentFile.file);
    } else if (documentFile.path && documentFile.disk) {
        return `${asset(documentFile.disk, documentFile.path)}`;
    }
}
