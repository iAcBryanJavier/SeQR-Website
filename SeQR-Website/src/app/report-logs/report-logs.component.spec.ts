import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportLogsComponent } from './report-logs.component';

describe('ReportLogsComponent', () => {
  let component: ReportLogsComponent;
  let fixture: ComponentFixture<ReportLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportLogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
