import { TestBed } from '@angular/core/testing';

import { WebsocketMessageService } from './websocket-message.service';

describe('WebsocketMessageService', () => {
  let service: WebsocketMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsocketMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
