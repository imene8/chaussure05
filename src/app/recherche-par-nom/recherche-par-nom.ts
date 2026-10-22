import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe } from '../search-filter-pipe';

@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  imports: [FormsModule, SearchFilterPipe],
  templateUrl: './recherche-par-nom.html'
})
export class RechercheParNom {
  chaussures: any[] = [];
  searchTerm = '';

  constructor() {
    this.chaussures = JSON.parse(localStorage.getItem('chaussures') || '[]');
  }
}