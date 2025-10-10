import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTank } from './add-tank';

describe('AddTank', () => {
  let component: AddTank;
  let fixture: ComponentFixture<AddTank>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTank]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTank);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
