import { TestBed } from '@angular/core/testing';

import { GabaritosService } from './gabaritos.service';

describe('GabaritosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GabaritosService = TestBed.get(GabaritosService);
    expect(service).toBeTruthy();
  });
});
