import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PaymentMethodsApiEndpoint } from './payment-methods-api-endpoint';

describe('PaymentMethodsApiEndpoint', () => {
    let service: PaymentMethodsApiEndpoint;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PaymentMethodsApiEndpoint],
        });
        service = TestBed.inject(PaymentMethodsApiEndpoint);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should fetch available payment methods', () => {
        const mockResponse = [{ id: '1', type: 'visa', label: 'Visa ending in 4242', isPrimary: true }];
        service.getAvailableMethods().subscribe(res => {
            expect(res.length).toBe(1);
            expect(res[0].type).toBe('visa');
        });

        const req = httpMock.expectOne('/api/payments/methods/available');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });
});
