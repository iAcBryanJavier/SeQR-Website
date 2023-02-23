import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportButtonChangeLogsComponent } from './export-button-change-logs.component';

describe('ExportButtonChangeLogsComponent', () => {
  let component: ExportButtonChangeLogsComponent;
  let fixture: ComponentFixture<ExportButtonChangeLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportButtonChangeLogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportButtonChangeLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
