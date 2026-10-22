import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModelDeChaussure, MODELES } from '../model/modelDeChaussure.model';

@Component({
  selector: 'app-recherche-par-modele',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './recherche-par-modele.html'
})
export class RechercheParModele {
  chaussures: any[] = [];
  modeles: ModelDeChaussure[] = MODELES;
  idModel = 0; // 0 = tous les modèles

  constructor() {
    this.chaussures = this.toutes();
  }

  toutes(): any[] {
    return JSON.parse(localStorage.getItem('chaussures') || '[]');
  }

  onChange(): void {
    const toutes = this.toutes();
    if (this.idModel) {
      this.chaussures = toutes.filter((c) => c.modelDeChaussure.idModel == this.idModel);
    } else {
      this.chaussures = toutes;
    }
  }
}
