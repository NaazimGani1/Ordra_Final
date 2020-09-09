import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkedOffProductReportComponent } from './marked-off-product-report.component';

describe('MarkedOffProductReportComponent', () => {
  let component: MarkedOffProductReportComponent;
  let fixture: ComponentFixture<MarkedOffProductReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkedOffProductReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkedOffProductReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
