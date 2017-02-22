/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TagService } from './tags.service';

describe('Service: Tag', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TagService]
    });
  });

  it('should ...', inject([TagService], (service: TagService) => {
    expect(service).toBeTruthy();
  }));
});
