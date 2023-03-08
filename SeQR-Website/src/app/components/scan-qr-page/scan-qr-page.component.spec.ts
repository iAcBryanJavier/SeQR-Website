import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanQrPageComponent } from './scan-qr-page.component';

describe('ScanQrPageComponent', () => {
  let component: ScanQrPageComponent;
  let fixture: ComponentFixture<ScanQrPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanQrPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScanQrPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
