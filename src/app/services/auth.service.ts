import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

const USERS: User[] = [
  { username: 'admin', password: '123', roles: ['ADMIN'] },
  { username: 'imene', password: '123', roles: ['USER'] },
];

@Injectable({ providedIn: 'root' })
export class AuthService {
  loggedUser = '';
  roles: string[] = [];
  isloggedIn = false;

  constructor() {
    const username = localStorage.getItem('loggedUser');
    const isloggedIn = localStorage.getItem('isloggedIn') === 'true';
    const user = USERS.find((item) => item.username === username);

    if (isloggedIn && user) {
      this.loggedUser = user.username;
      this.roles = [...user.roles];
      this.isloggedIn = true;
    } else {
      this.clearSession();
    }
  }

  signIn(username: string, password: string): boolean {
    const user = USERS.find((item) => item.username === username.trim() && item.password === password);
    if (!user) {
      return false;
    }

    this.loggedUser = user.username;
    this.roles = [...user.roles];
    this.isloggedIn = true;
    localStorage.setItem('loggedUser', user.username);
    localStorage.setItem('isloggedIn', 'true');
    return true;
  }

  logout(): void {
    this.clearSession();
  }

  isAdmin(): boolean {
    return this.roles.includes('ADMIN');
  }

  private clearSession(): void {
    this.loggedUser = '';
    this.roles = [];
    this.isloggedIn = false;
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('isloggedIn');
  }
}
