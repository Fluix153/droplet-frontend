import { BaseEntity } from '../../../shared/infrastructure/base-entity';

type AlertInit = {
  id: number;
  UserId: number;
  MetricType: string;
  Severity: string;
  Message: string;
  TriggeredAt: Date;
};

type AlertInitInput = Omit<AlertInit, 'TriggeredAt'> & { TriggeredAt: string | Date };

export class Alert implements BaseEntity {
  private constructor(private readonly props: AlertInit) {}

  static create(input: AlertInitInput): Alert {
    const triggeredAt =
      input.TriggeredAt instanceof Date ? input.TriggeredAt : new Date(input.TriggeredAt);

    return new Alert({
      id: input.id,
      UserId: input.UserId,
      MetricType: input.MetricType,
      Severity: input.Severity,
      Message: input.Message,
      TriggeredAt: triggeredAt
    });
  }

  get id(): number {
    return this.props.id;
  }

  get UserId(): number {
    return this.props.UserId;
  }

  get MetricType(): string {
    return this.props.MetricType;
  }

  get Severity(): string {
    return this.props.Severity;
  }

  get Message(): string {
    return this.props.Message;
  }

  get TriggeredAt(): Date {
    return this.props.TriggeredAt;
  }
}
