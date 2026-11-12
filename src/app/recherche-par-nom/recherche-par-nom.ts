import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chaussure } from '../model/chaussure.model';
import { SearchFilterPipe } from '../search-filter-pipe';
import { ChaussureService } from '../services/chaussure.service';

@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  imports: [FormsModule, SearchFilterPipe],
  templateUrl: './recherche-par-nom.html'
})
export class RechercheParNom {
  chaussures: Chaussure[] = [];
  searchTerm = '';
  erreur = '';

  constructor(chaussureService: ChaussureService) {
    try {
      this.chaussures = chaussureService.liste();
    } catch (error) {
      this.erreur = error instanceof Error ? error.message : 'Impossible de charger les chaussures.';
    }
  }
}