export interface DeviceStatus {
    id: string;
    name: string;
    currentFlow: number;          // L/min
    usage: number;                // Litros acumulados
    battery: number;              // Porcentaje
}
