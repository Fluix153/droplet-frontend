import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardMetrics } from '../domain/model/dashboard-metrics.entity';
import { DeviceStatus } from '../domain/model/device-status.entity';
import { IrrigationStatus } from '../domain/model/irrigation-status.entity';
import { DashboardAdapter } from './dashboard-adapter';
import { environment } from 'src/environments/environments';
import { Observable, catchError, map } from 'rxjs';
import { BaseApi } from 'shared/infrastructure/base-api';
import { BaseResponse } from 'shared/infrastructure/base-response';

@Injectable({ providedIn: 'root' })
export class DashboardApi extends BaseApi {
    private readonly baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
        super();
    }

    getMetrics(): Observable<DashboardMetrics> {
        return this.http.get<BaseResponse<any>>(`${this.baseUrl}/metrics`).pipe(
            map(res => DashboardAdapter.toDashboardMetrics(res.data)),
            catchError(this.handleError)
        );
    }

    getDevices(): Observable<DeviceStatus[]> {
        return this.http.get<BaseResponse<any[]>>(`${this.baseUrl}/devices`).pipe(
            map(res => res.data.map(DashboardAdapter.toDeviceStatus)),
            catchError(this.handleError)
        );
    }

    getIrrigation(): Observable<IrrigationStatus> {
        return this.http.get<BaseResponse<any>>(`${this.baseUrl}/irrigation`).pipe(
            map(res => DashboardAdapter.toIrrigationStatus(res.data)),
            catchError(this.handleError)
        );
    }

    scheduleIrrigation(time: string): Observable<void> {
        return this.http.post<void>(`${this.baseUrl}/irrigation/schedule`, { time }).pipe(
            catchError(this.handleError)
        );
    }
}
