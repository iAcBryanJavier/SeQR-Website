import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportButtonPdfComponent } from './export-button-pdf.component';

describe('ExportButtonPdfComponent', () => {
  let component: ExportButtonPdfComponent;
  let fixture: ComponentFixture<ExportButtonPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportButtonPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportButtonPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
