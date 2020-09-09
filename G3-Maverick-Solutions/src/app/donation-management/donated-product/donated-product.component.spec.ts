import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonatedProductComponent } from './donated-product.component';

describe('DonatedProductComponent', () => {
  let component: DonatedProductComponent;
  let fixture: ComponentFixture<DonatedProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonatedProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonatedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
