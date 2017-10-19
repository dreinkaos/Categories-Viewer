import { TestBed, inject } from '@angular/core/testing';

import { SqlServerService } from './sql-server.service';

describe('SqlServerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SqlServerService]
    });
  });

  it('should be created', inject([SqlServerService], (service: SqlServerService) => {
    expect(service).toBeTruthy();
  }));
});
