import { ComponentFixture, TestBed } from '@angular/core/testing';
import jsQR, { QRCode } from 'jsqr';
import { ReadQrComponentComponent } from './read-qr-component.component';

describe('ReadQrComponentComponent', () => {
  let component: ReadQrComponentComponent;
  let fixture: ComponentFixture<ReadQrComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadQrComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadQrComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
