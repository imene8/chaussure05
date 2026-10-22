import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ModelDeChaussure, MODELES } from '../model/modelDeChaussure.model';

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

  constructor(private router: Router) {}

  ajouter(): void {
    if (
      this.id === null ||
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

    if (chaussures.some((c: any) => c.id == this.id)) {
      alert('Cet ID existe déjà.');
      return;
    }

    chaussures.push({
      id: this.id,
      nom: this.nom.trim(),
      prix: this.prix,
      taille: this.taille,
      modelDeChaussure: modelDeChaussure
    });

    localStorage.setItem('chaussures', JSON.stringify(chaussures));

    this.router.navigate(['/chaussures']);
  }
}