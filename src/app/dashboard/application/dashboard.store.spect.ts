import { TestBed } from '@angular/core/testing';
import { DashboardStore } from './dashboard.store';
import { DashboardApi } from '../infrastructure/dashboard-api';
import { of } from 'rxjs';

describe('DashboardStore', () => {
    let store: DashboardStore;
    let apiSpy: jasmine.SpyObj<DashboardApi>;

    beforeEach(() => {
        apiSpy = jasmine.createSpyObj('DashboardApi', ['getMetrics', 'getDevices', 'getIrrigation', 'scheduleIrrigation']);

        TestBed.configureTestingModule({
            providers: [
                DashboardStore,
                { provide: DashboardApi, useValue: apiSpy }
            ]
        });

        store = TestBed.inject(DashboardStore);
    });

    it('should load all dashboard data', () => {
        apiSpy.getMetrics.and.returnValue(of({ totalConsumption: 1000, flowRate: 10, temperature: 20, activeDevices: 3 }));
        apiSpy.getDevices.and.returnValue(of([]));
        apiSpy.getIrrigation.and.returnValue(of({ autoScheduleEnabled: true, soilMoisture: 45 }));

        store.loadAll();

        expect(apiSpy.getMetrics).toHaveBeenCalled();
        expect(apiSpy.getDevices).toHaveBeenCalled();
        expect(apiSpy.getIrrigation).toHaveBeenCalled();
    });
});
