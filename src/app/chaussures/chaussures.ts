import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MODELES } from '../model/modelDeChaussure.model';

@Component({
  selector: 'app-chaussures',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './chaussures.html',
  styleUrl: './chaussures.css'
})
export class Chaussures {
  chaussures = signal<any[]>([]);

  constructor() {
    this.charger();
  }

  charger(): void {
    const data = localStorage.getItem('chaussures');
    if (data === null) {
      // Données de départ (première ouverture seulement)
      const depart = [
        { id: 1, nom: 'Air Max', prix: 320, taille: 42, modelDeChaussure: MODELES[0] },
        { id: 2, nom: 'Stan Smith', prix: 250, taille: 41, modelDeChaussure: MODELES[1] },
        { id: 3, nom: 'Timberland', prix: 480, taille: 44, modelDeChaussure: MODELES[3] },
      ];
      localStorage.setItem('chaussures', JSON.stringify(depart));
      this.chaussures.set(depart);
    } else {
      this.chaussures.set(JSON.parse(data));
    }
  }

  supprimer(id: number): void {
    const reste = this.chaussures().filter((c) => c.id != id);
    localStorage.setItem('chaussures', JSON.stringify(reste));
    this.chaussures.set(reste);
  }
}