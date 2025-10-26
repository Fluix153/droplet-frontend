import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankList } from './tank-list';

describe('TankList', () => {
  let component: TankList;
  let fixture: ComponentFixture<TankList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TankList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TankList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
