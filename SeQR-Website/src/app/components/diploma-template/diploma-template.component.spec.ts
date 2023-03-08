import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaTemplateComponent } from './diploma-template.component';

describe('DiplomaTemplateComponent', () => {
  let component: DiplomaTemplateComponent;
  let fixture: ComponentFixture<DiplomaTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiplomaTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiplomaTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
