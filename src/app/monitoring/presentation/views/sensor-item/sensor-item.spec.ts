import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorItem } from './sensor-item';

describe('SensorItem', () => {
  let component: SensorItem;
  let fixture: ComponentFixture<SensorItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensorItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SensorItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
