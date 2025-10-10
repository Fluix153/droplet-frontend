export class Sensor {
  private _id: number;
  private _DeviceCod: string;
  private _Type: string;
  private _Location: string;
  private _Status: string;

  constructor(Sensor:{id: number, DeviceCod: string,
    Type: string, Location: string, Status: string}) {
    this._id = Sensor.id;
    this._DeviceCod = Sensor.DeviceCod;
    this._Type = Sensor.Type;
    this._Location = Sensor.Location;
    this._Status = Sensor.Status;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get DeviceCod(): string {
    return this._DeviceCod;
  }

  set DeviceCod(value: string) {
    this._DeviceCod = value;
  }

  get Type(): string {
    return this._Type;
  }

  set Type(value: string) {
    this._Type = value;
  }

  get Location(): string {
    return this._Location;
  }

  set Location(value: string) {
    this._Location = value;
  }

  get Status(): string {
    return this._Status;
  }

  set Status(value: string) {
    this._Status = value;
  }
}
