import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chaussure } from '../model/chaussure.model';
import { AuthService } from '../services/auth.service';
import { ChaussureService } from '../services/chaussure.service';

@Component({
  selector: 'app-chaussures',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './chaussures.html',
  styleUrl: './chaussures.css'
})
export class Chaussures {
  chaussures = signal<Chaussure[]>([]);
  erreur = signal('');
  readonly authService = inject(AuthService);
  private readonly chaussureService = inject(ChaussureService);

  constructor() {
    this.charger();
  }

  charger(): void {
    try {
      this.chaussures.set(this.chaussureService.liste());
      this.erreur.set('');
    } catch (error) {
      this.erreur.set(error instanceof Error ? error.message : 'Impossible de charger les chaussures.');
    }
  }

  supprimer(id: number): void {
    if (!this.authService.isAdmin()) {
      return;
    }
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette chaussure ?')) {
      return;
    }
    try {
      this.chaussureService.supprimer(id);
      this.charger();
    } catch (error) {
      this.erreur.set(error instanceof Error ? error.message : 'Impossible de supprimer cette chaussure.');
    }
  }
}