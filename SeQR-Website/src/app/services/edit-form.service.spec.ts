import { TestBed } from '@angular/core/testing';

import { EditFormService } from './edit-form.service';

describe('EditFormService', () => {
  let service: EditFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
