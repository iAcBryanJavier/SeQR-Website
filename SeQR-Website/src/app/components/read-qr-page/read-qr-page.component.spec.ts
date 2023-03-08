import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadQrPageComponent } from './read-qr-page.component';

describe('ReadQrPageComponent', () => {
  let component: ReadQrPageComponent;
  let fixture: ComponentFixture<ReadQrPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadQrPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadQrPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
