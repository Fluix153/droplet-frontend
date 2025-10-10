export interface IrrigationStatus {
    autoScheduleEnabled: boolean;
    soilMoisture: number;         // Porcentaje
    lastRun?: string;             // ISO timestamp
}
