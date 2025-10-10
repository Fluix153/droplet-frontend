import { DashboardMetrics } from '../domain/model/dashboard-metrics.entity';
import { DeviceStatus } from '../domain/model/device-status.entity';
import { IrrigationStatus } from '../domain/model/irrigation-status.entity';

export class DashboardAdapter {
    static toDashboardMetrics(dto: any): DashboardMetrics {
        return {
            totalConsumption: dto.total_consumption,
            flowRate: dto.flow_rate,
            temperature: dto.temperature,
            activeDevices: dto.active_devices
        };
    }

    static toDeviceStatus(dto: any): DeviceStatus {
        return {
            id: dto.id,
            name: dto.name,
            currentFlow: dto.current_flow,
            usage: dto.usage,
            battery: dto.battery
        };
    }

    static toIrrigationStatus(dto: any): IrrigationStatus {
        return {
            autoScheduleEnabled: dto.auto_schedule_enabled,
            soilMoisture: dto.soil_moisture,
            lastRun: dto.last_run
        };
    }
}
