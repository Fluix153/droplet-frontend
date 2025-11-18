import { BaseEntity } from '../../../shared/infrastructure/base-entity';

type SensorInit = {
  id: number;
  DeviceCod: string;
  Type: string;
  Location: string;
  Status: string;
};

export class Sensor implements BaseEntity {
  private constructor(private readonly props: SensorInit) {}

  static create(input: SensorInit): Sensor {
    return new Sensor({
      id: input.id,
      DeviceCod: input.DeviceCod,
      Type: input.Type,
      Location: input.Location,
      Status: input.Status
    });
  }

  get id(): number {
    return this.props.id;
  }

  get DeviceCod(): string {
    return this.props.DeviceCod;
  }

  get Type(): string {
    return this.props.Type;
  }

  get Location(): string {
    return this.props.Location;
  }

  get Status(): string {
    return this.props.Status;
  }
}
