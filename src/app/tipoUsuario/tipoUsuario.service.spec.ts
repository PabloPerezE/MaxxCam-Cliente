/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TipoUsuarioService } from './tipoUsuario.service';

describe('Service: TipoUsuario', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipoUsuarioService]
    });
  });

  it('should ...', inject([TipoUsuarioService], (service: TipoUsuarioService) => {
    expect(service).toBeTruthy();
  }));
});
