export interface UploadStatus<T> {
    f?: File;
    ok: boolean;
    progress: number; // percentage
    done: boolean;
    respone?: T;
}