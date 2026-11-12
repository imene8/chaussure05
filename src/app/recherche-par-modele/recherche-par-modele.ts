import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chaussure } from '../model/chaussure.model';
import { ModelDeChaussure, MODELES } from '../model/modelDeChaussure.model';
import { ChaussureService } from '../services/chaussure.service';

@Component({
  selector: 'app-recherche-par-modele',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './recherche-par-modele.html'
})
export class RechercheParModele {
  chaussures: Chaussure[] = [];
  modeles: ModelDeChaussure[] = MODELES;
  idModel = 0; // 0 = tous les modèles
  erreur = '';

  constructor(private chaussureService: ChaussureService) {
    this.onChange();
  }

  onChange(): void {
    try {
      this.chaussures = this.chaussureService.rechercherParModele(this.idModel);
      this.erreur = '';
    } catch (error) {
      this.erreur = error instanceof Error ? error.message : 'Impossible de rechercher les chaussures.';
      this.chaussures = [];
    }
  }
}