import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorEdit } from './sensor-edit';

describe('SensorEdit', () => {
  let component: SensorEdit;
  let fixture: ComponentFixture<SensorEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensorEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SensorEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
