import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanLandingComponent } from './scan-landing.component';

describe('ScanLandingComponent', () => {
  let component: ScanLandingComponent;
  let fixture: ComponentFixture<ScanLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanLandingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScanLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
