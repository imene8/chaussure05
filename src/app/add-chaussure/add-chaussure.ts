import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Chaussure } from '../model/chaussure.model';
import { ModelDeChaussure, MODELES } from '../model/modelDeChaussure.model';
import { ChaussureService } from '../services/chaussure.service';

@Component({
  selector: 'app-add-chaussure',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './add-chaussure.html',
  styleUrl: './add-chaussure.css'
})
export class AddChaussure {
  id: number | null = null;
  nom = '';
  prix: number | null = null;
  taille: number | null = null;
  modeles: ModelDeChaussure[] = MODELES;
  idModel: number | null = null;
  erreur = '';

  constructor(private router: Router, private chaussureService: ChaussureService) {}

  ajouter(): void {
    if (
      this.id === null ||
      !Number.isInteger(this.id) ||
      this.id <= 0 ||
      this.nom.trim() === '' ||
      this.prix === null ||
      this.taille === null ||
      !Number.isFinite(this.prix) ||
      this.prix <= 0 ||
      !Number.isInteger(this.taille) ||
      this.taille <= 0 ||
      this.idModel === null
    ) {
      this.erreur = 'Veuillez renseigner un identifiant entier positif, un nom, un prix positif, une taille entière positive et un modèle.';
      return;
    }

    const modelDeChaussure = this.modeles.find((modele) => modele.idModel === this.idModel);
    if (!modelDeChaussure) {
      this.erreur = 'Veuillez sélectionner un modèle valide.';
      return;
    }

    const chaussure: Chaussure = {
      id: this.id,
      nom: this.nom.trim(),
      prix: this.prix,
      taille: this.taille,
      modelDeChaussure: modelDeChaussure
    };

    try {
      this.chaussureService.ajouter(chaussure);
      this.router.navigate(['/chaussures']);
    } catch (error) {
      this.erreur = error instanceof Error ? error.message : 'Impossible d’ajouter cette chaussure.';
    }
  }
}