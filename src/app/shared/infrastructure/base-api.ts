export abstract class BaseApi {
    protected handleError(error: any): never {
        console.error('API Error:', error);
        throw error;
    }
}
