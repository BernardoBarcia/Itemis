import { TestBed } from '@angular/core/testing';

import { GoodsManagerService } from './goods-manager.service';

describe('GoodsManagerService', () => {
  let service: GoodsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoodsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
