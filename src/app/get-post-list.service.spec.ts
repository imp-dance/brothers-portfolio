import { TestBed } from '@angular/core/testing';

import { GetPostListService } from './get-post-list.service';

describe('GetPostListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetPostListService = TestBed.get(GetPostListService);
    expect(service).toBeTruthy();
  });
});
