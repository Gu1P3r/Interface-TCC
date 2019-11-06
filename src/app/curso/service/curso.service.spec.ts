import { CursoService } from './curso.service';
import { TestBed } from '@angular/core/testing';


describe('CursoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CursoService = TestBed.get(CursoService);
    expect(service).toBeTruthy();
  });
});