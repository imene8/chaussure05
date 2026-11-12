import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
})
export class Login {
  username = '';
  password = '';
  erreur = '';

  constructor(
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  seConnecter(): void {
    if (!this.authService.signIn(this.username, this.password)) {
      this.erreur = 'Nom d’utilisateur ou mot de passe incorrect.';
      return;
    }

    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    const destination = returnUrl?.startsWith('/') && !returnUrl.startsWith('//')
      ? returnUrl
      : '/chaussures';
    this.router.navigateByUrl(destination);
  }
}
