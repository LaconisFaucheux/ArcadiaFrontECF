import { TestBed } from '@angular/core/testing';

import { ToastNotifService } from './toast-notif.service';

describe('ToastNotifService', () => {
  let service: ToastNotifService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastNotifService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
