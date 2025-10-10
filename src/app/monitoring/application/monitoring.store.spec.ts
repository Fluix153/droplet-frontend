import { TestBed } from '@angular/core/testing';

import { MonitoringStore } from './monitoring.store';

describe('MonitoringStore', () => {
  let service: MonitoringStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonitoringStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
