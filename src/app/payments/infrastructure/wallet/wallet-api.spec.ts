import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WalletApiEndpoint } from './wallet-api-endpoint';

describe('WalletApiEndpoint', () => {
    let service: WalletApiEndpoint;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [WalletApiEndpoint],
        });
        service = TestBed.inject(WalletApiEndpoint);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should fetch wallet info', () => {
        const mockResponse = {
            balance: 125.75,
            rewardsPoints: 2345,
            cashbackRate: 2.5,
            nextPayoutDate: '2025-12-15',
        };

        service.getWalletInfo().subscribe(res => {
            expect(res.balance).toBe(125.75);
            expect(res.rewardsPoints).toBe(2345);
        });

        const req = httpMock.expectOne('/api/payments/wallet/info');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });
});
