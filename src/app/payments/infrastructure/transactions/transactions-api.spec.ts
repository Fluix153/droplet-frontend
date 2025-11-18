import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TransactionsApiEndpoint } from './transactions-api-endpoint';

describe('TransactionsApiEndpoint', () => {
    let service: TransactionsApiEndpoint;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TransactionsApiEndpoint],
        });
        service = TestBed.inject(TransactionsApiEndpoint);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should fetch recent transactions', () => {
        const mockResponse = [{ id: '1', type: 'charge', amount: 100, date: '2025-10-01', description: 'Monthly Service' }];
        service.getRecentTransactions().subscribe(res => {
            expect(res.length).toBe(1);
            expect(res[0].type).toBe('charge');
        });

        const req = httpMock.expectOne('/api/payments/transactions/recent');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });
});
