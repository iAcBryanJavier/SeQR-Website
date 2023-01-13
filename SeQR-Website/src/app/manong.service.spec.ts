import { TestBed } from '@angular/core/testing';

import { ManongService } from './manong.service';

describe('ManongService', () => {
  let service: ManongService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManongService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
