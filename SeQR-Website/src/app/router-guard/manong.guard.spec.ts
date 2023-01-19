import { TestBed } from '@angular/core/testing';

import { ManongGuard } from './manong.guard';

describe('ManongGuard', () => {
  let guard: ManongGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ManongGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
