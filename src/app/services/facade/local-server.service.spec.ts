import { TestBed } from '@angular/core/testing';

import { LocalServerFacadeService } from './local-server-facade.service';

describe('LocalServerService', () => {
  let service: LocalServerFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalServerFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
