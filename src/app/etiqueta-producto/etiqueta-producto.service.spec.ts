/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EtiquetaProductoService } from './etiqueta-producto.service';

describe('Service: EtiquetaProducto', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EtiquetaProductoService]
    });
  });

  it('should ...', inject([EtiquetaProductoService], (service: EtiquetaProductoService) => {
    expect(service).toBeTruthy();
  }));
});
