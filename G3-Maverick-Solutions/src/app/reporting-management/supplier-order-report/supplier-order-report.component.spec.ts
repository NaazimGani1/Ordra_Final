import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierOrderReportComponent } from './supplier-order-report.component';

describe('SupplierOrderReportComponent', () => {
  let component: SupplierOrderReportComponent;
  let fixture: ComponentFixture<SupplierOrderReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierOrderReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierOrderReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
