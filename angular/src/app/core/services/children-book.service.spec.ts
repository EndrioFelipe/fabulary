import { TestBed } from '@angular/core/testing';

import { ChildrenBookService } from './children-book.service';

describe('ChildrenBookService', () => {
  let service: ChildrenBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChildrenBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
