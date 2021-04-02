import { TestBed } from '@angular/core/testing';

import { CreateDynamicComponentService } from './create-dynamic-component.service';

describe('CreateDynamicComponentService', () => {
  let service: CreateDynamicComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateDynamicComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
