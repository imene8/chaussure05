import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Chaussure } from '../model/chaussure.model';
import { ModelDeChaussure, MODELES } from '../model/modelDeChaussure.model';
import { ChaussureService } from '../services/chaussure.service';

@Component({
  selector: 'app-update-chaussure',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './update-chaussure.html',
  styleUrl: './update-chaussure.css'
})
export class UpdateChaussure {
  id: number | null = null;
  nom = '';
  prix: number | null = null;
  taille: number | null = null;
  modeles: ModelDeChaussure[] = MODELES;
  idModel: number | null = null;
  erreur = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chaussureService: ChaussureService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    let chaussure: Chaussure | undefined;
    try {
      chaussure = this.chaussureService.liste().find((item) => item.id === id);
    } catch (error) {
      this.erreur = error instanceof Error ? error.message : 'Impossible de charger cette chaussure.';
      return;
    }

    if (!chaussure) {
      this.router.navigate(['/chaussures']);
      return;
    }

    this.id = chaussure.id;
    this.nom = chaussure.nom;
    this.prix = chaussure.prix;
    this.taille = chaussure.taille;
    this.idModel = chaussure.modelDeChaussure.idModel;
  }

  modifier(): void {
    if (
      this.id === null ||
      this.nom.trim() === '' ||
      this.prix === null ||
      this.taille === null ||
      !Number.isFinite(this.prix) ||
      this.prix <= 0 ||
      !Number.isInteger(this.taille) ||
      this.taille <= 0 ||
      this.idModel === null
    ) {
      this.erreur = 'Veuillez renseigner un nom, un prix positif, une taille entière positive et un modèle.';
      return;
    }

    const modelDeChaussure = this.modeles.find((modele) => modele.idModel === this.idModel);
    if (!modelDeChaussure) {
      this.erreur = 'Veuillez sélectionner un modèle valide.';
      return;
    }

    try {
      this.chaussureService.modifier({
        id: this.id,
        nom: this.nom.trim(),
        prix: this.prix,
        taille: this.taille,
        modelDeChaussure
      });
      this.router.navigate(['/chaussures']);
    } catch (error) {
      this.erreur = error instanceof Error ? error.message : 'Impossible de modifier cette chaussure.';
    }
  }
}