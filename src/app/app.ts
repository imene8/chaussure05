import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(
    public readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  seDeconnecter(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
