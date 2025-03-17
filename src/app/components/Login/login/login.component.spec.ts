import { AuthService } from "../../../services/auth.service";
import { fireEvent, render, screen } from '@testing-library/angular';
import { LoginComponent } from "./login.component";
import { of, throwError } from "rxjs";

describe('LoginComponent', () => {
  let authServiceMock: jest.Mocked<AuthService>

  beforeEach(async () => {
    authServiceMock = {
      login: jest.fn()
    } as unknown as jest.Mocked<AuthService>;

    delete (window as any).location
    window.location = { href: '' } as any;
  });

  it('should redirect to dashboard on success login', async() => {
    authServiceMock.login.mockReturnValueOnce(of({ token: 'fake-jwt-token'}));

    await render(LoginComponent, {
      providers: [
        { provide: AuthService, useValue: authServiceMock}
      ]
    })

    //when
    fireEvent.input(screen.getByPlaceholderText('Email'), { target: { value: 'Kim@gmail.com'}});
    fireEvent.input(screen.getByPlaceholderText('Password'), { target: { value: '12345'}});
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    expect(authServiceMock.login).toHaveBeenCalledWith('Kim@gmail.com', '12345');
    expect(window.location.href).toBe('/dashboard');
  })

  it('should fail when try to login', async () => {
    authServiceMock.login.mockReturnValueOnce(throwError(() => ({ error: { message: 'Invalid email or password' }}) ));

    await render(LoginComponent, {
      providers: [
        { provide: AuthService, useValue: authServiceMock}
      ]
    })

    //when
    fireEvent.input(screen.getByPlaceholderText('Email'), { target: { value: 'Kim@gmail.com'}});
    fireEvent.input(screen.getByPlaceholderText('Password'), { target: { value: 'wrongPassword'}});
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    expect(authServiceMock.login).toHaveBeenCalledWith('Kim@gmail.com', 'wrongPassword');
    const errorMessage = await screen.findByText('Invalid email or password');
    expect(errorMessage).toBeInTheDocument();
  })

});
