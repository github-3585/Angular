import { TestBed, inject } from '@angular/core/testing';

import { LeftnavService } from './leftnav.service';

describe('LeftnavService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeftnavService]
    });
  });

  it('should be created', inject([LeftnavService], (service: LeftnavService) => {
    expect(service).toBeTruthy();
  }));
});
