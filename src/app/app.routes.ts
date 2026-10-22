import { Routes } from '@angular/router';
import { Chaussures } from './chaussures/chaussures';
import { AddChaussure } from './add-chaussure/add-chaussure';
import { UpdateChaussure } from './update-chaussure/update-chaussure';
import { RechercheParModele } from './recherche-par-modele/recherche-par-modele';
import { RechercheParNom } from './recherche-par-nom/recherche-par-nom';

export const routes: Routes = [
  { path: 'chaussures', component: Chaussures },
  { path: 'add-chaussure', component: AddChaussure },
  { path: 'update-chaussure/:id', component: UpdateChaussure },
  { path: 'recherche-par-modele', component: RechercheParModele },
  { path: 'recherche-par-nom', component: RechercheParNom },
  { path: '', redirectTo: 'chaussures', pathMatch: 'full' },
  { path: '**', redirectTo: 'chaussures' },
];