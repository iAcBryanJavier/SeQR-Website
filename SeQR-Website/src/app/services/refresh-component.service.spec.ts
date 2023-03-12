import { TestBed } from '@angular/core/testing';

import { RefreshComponentService } from './refresh-component.service';

describe('RefreshComponentService', () => {
  let service: RefreshComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
