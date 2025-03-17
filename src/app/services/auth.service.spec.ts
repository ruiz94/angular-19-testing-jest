import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
        AuthService
      ]
    });
    service = TestBed.inject(AuthService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    //verify there is no pending requests
    httpTesting.verify();
  })

  it('should be created', () => {
    //given
    //when
    //then
    expect(service).toBeTruthy();
  });

  it('should log in', async () => {
    //given
    const mockResponse = { token: 'fake-jwt-token' }

    //when
    const params = {
      email: 'pepito@gmail.com',
      password: 'password123'
    }
    const login$ = service.login(params.email, params.password);
    //firstValueFrom() -> knowing login$ is an observable, firstValueFrom() gives you the first value and unsubscribe immediately -> return a promise
    const loginPromise = firstValueFrom(login$);

    const req = httpTesting.expectOne('/api/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(params);

    req.flush(mockResponse); //mockResponse is the response login method must return, we simulate (mock) the response

    //then
    expect( await loginPromise).toEqual(mockResponse);
  })
});
