/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GoerliEtherscanService } from './goerli-etherscan.service';

describe('Service: GoerliEtherscan', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoerliEtherscanService]
    });
  });

  it('should ...', inject([GoerliEtherscanService], (service: GoerliEtherscanService) => {
    expect(service).toBeTruthy();
  }));
});
