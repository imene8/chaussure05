import { afterEach, describe, expect, it } from 'vitest';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  afterEach(() => localStorage.clear());

  it('authenticates admins and regular users with the configured demo accounts', () => {
    const auth = new AuthService();

    expect(auth.signIn('admin', '123')).toBe(true);
    expect(auth.isAdmin()).toBe(true);
    expect(auth.loggedUser).toBe('admin');

    auth.logout();
    expect(auth.signIn('imene', '123')).toBe(true);
    expect(auth.isAdmin()).toBe(false);
  });

  it('rejects invalid credentials without creating a session', () => {
    const auth = new AuthService();

    expect(auth.signIn('admin', 'incorrect')).toBe(false);
    expect(auth.isloggedIn).toBe(false);
    expect(auth.isAdmin()).toBe(false);
  });

  it('restores a valid saved session and clears an unknown user', () => {
    localStorage.setItem('loggedUser', 'imene');
    localStorage.setItem('isloggedIn', 'true');
    const restored = new AuthService();
    expect(restored.isloggedIn).toBe(true);
    expect(restored.loggedUser).toBe('imene');

    localStorage.setItem('loggedUser', 'unknown');
    const invalid = new AuthService();
    expect(invalid.isloggedIn).toBe(false);
    expect(localStorage.getItem('loggedUser')).toBeNull();
  });
});
