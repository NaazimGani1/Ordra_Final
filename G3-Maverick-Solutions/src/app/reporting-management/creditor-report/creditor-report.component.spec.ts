import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditorReportComponent } from './creditor-report.component';

describe('CreditorReportComponent', () => {
  let component: CreditorReportComponent;
  let fixture: ComponentFixture<CreditorReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditorReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditorReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
