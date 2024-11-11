import { TestBed } from '@angular/core/testing';

import { SerieEngineService } from './serie-engine.service';

describe('SerieEngineService', () => {
  let service: SerieEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SerieEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
