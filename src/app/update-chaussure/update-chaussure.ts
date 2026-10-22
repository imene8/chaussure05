import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ModelDeChaussure, MODELES } from '../model/modelDeChaussure.model';

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

  constructor(private route: ActivatedRoute, private router: Router) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const chaussures = JSON.parse(localStorage.getItem('chaussures') || '[]');
    const c = chaussures.find((x: any) => x.id == id);

    if (!c) {
      this.router.navigate(['/chaussures']);
      return;
    }

    this.id = c.id;
    this.nom = c.nom;
    this.prix = c.prix;
    this.taille = c.taille;
    this.idModel = c.modelDeChaussure.idModel;
  }

  modifier(): void {
    if (
      this.nom.trim() === '' ||
      this.prix === null ||
      this.taille === null ||
      this.prix <= 0 ||
      this.taille <= 0 ||
      this.idModel === null
    ) {
      alert('Veuillez remplir correctement tous les champs.');
      return;
    }

    const modelDeChaussure = this.modeles.find((c) => c.idModel == this.idModel)!;
    const chaussures = JSON.parse(localStorage.getItem('chaussures') || '[]');

    const index = chaussures.findIndex((c: any) => c.id == this.id);
    if (index !== -1) {
      chaussures[index] = {
        id: this.id,
        nom: this.nom.trim(),
        prix: this.prix,
        taille: this.taille,
        modelDeChaussure: modelDeChaussure
      };
      localStorage.setItem('chaussures', JSON.stringify(chaussures));
    }

    // Retour direct à la page principale, sans boîte d'alerte
    this.router.navigate(['/chaussures']);
  }
}