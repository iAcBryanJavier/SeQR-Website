import { TestBed } from '@angular/core/testing';

import { SvgToPngService } from './svg-to-png.service';

describe('SvgToPngService', () => {
  let service: SvgToPngService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvgToPngService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
