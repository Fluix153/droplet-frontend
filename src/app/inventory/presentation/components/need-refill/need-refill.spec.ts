import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedRefill } from './need-refill';

describe('NeedRefill', () => {
  let component: NeedRefill;
  let fixture: ComponentFixture<NeedRefill>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeedRefill]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeedRefill);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
