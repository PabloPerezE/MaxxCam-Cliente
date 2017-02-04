/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrdenCompraService } from './ordenCompra.service';

describe('Service: OrdenCompra', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrdenCompraService]
    });
  });

  it('should ...', inject([OrdenCompraService], (service: OrdenCompraService) => {
    expect(service).toBeTruthy();
  }));
});
