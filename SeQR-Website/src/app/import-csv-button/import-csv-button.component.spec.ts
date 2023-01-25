import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportCsvButtonComponent } from './import-csv-button.component';

describe('ImportCsvButtonComponent', () => {
  let component: ImportCsvButtonComponent;
  let fixture: ComponentFixture<ImportCsvButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportCsvButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportCsvButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
