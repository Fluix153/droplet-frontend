/**
 * Represents an Alert entity with an alertId, userId, MetricType, Severity, Message an Triggered at
 */
export class Alert {
  private _id: number;
  private _UserId: number;
  private _MetricType: string;
  private _Severity: string;
  private _Message: string;
  private _TriggeredAt: Date;


  /**
   * Creates a new Alert instance
   *
   */
  constructor(Alert: {id: number, UserId: number, MetricType: string,
    Severity: string, Message: string, TriggeredAt: Date}) {
    this._id = Alert.id;
    this._UserId = Alert.UserId;
    this._MetricType = Alert.MetricType;
    this._Severity = Alert.Severity;
    this._Message = Alert.Message;
    this._TriggeredAt = Alert.TriggeredAt;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get userId(): number {
    return this._UserId;
  }

  set userId(value: number) {
    this._UserId = value;
  }

  get MetricType(): string {
    return this._MetricType;
  }

  set MetricType(value: string) {
    this._MetricType = value;
  }

  get Severity(): string {
    return this._Severity;
  }

  set Severity(value: string) {
    this._Severity = value;
  }

  get Message(): string {
    return this._Message;
  }

  set Message(value: string) {
    this._Message = value;
  }

  get TriggeredAt(): Date {
    return this._TriggeredAt;
  }

  set TriggeredAt(value: Date) {
    this._TriggeredAt = value;
  }
}



