import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContadorSignals } from './contador-signals';

describe('ContadorSignals', () => {
  let component: ContadorSignals;
  let fixture: ComponentFixture<ContadorSignals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContadorSignals]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContadorSignals);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
