/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InfoprodService } from './infoprod.service';

describe('Service: Infoprod', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfoprodService]
    });
  });

  it('should ...', inject([InfoprodService], (service: InfoprodService) => {
    expect(service).toBeTruthy();
  }));
});
