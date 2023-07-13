export interface ServiceResponse<T> {
    serviceResponse?: ServiceResponse<T>;
    message: string;
    success: boolean;
    data: T | null;
}

