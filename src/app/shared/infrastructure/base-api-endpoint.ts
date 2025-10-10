export abstract class BaseApiEndpoint {
    protected readonly baseUrl = '/api';

    protected buildUrl(path: string): string {
        return `${this.baseUrl}/${path}`;
    }
}
