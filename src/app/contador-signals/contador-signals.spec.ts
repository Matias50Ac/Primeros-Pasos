import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContadorSignalsComponent } from './contador-signals';

describe('ContadorSignals', () => {
  let component: ContadorSignalsComponent;
  let fixture: ComponentFixture<ContadorSignalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContadorSignalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContadorSignalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
