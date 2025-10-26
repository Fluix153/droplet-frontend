import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MonitoringApi } from './monitoring-api';

describe('MonitoringApi', () => {
  let service: MonitoringApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(MonitoringApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
