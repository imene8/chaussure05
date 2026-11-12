import { Routes } from '@angular/router';
import { Chaussures } from './chaussures/chaussures';
import { AddChaussure } from './add-chaussure/add-chaussure';
import { UpdateChaussure } from './update-chaussure/update-chaussure';
import { RechercheParModele } from './recherche-par-modele/recherche-par-modele';
import { RechercheParNom } from './recherche-par-nom/recherche-par-nom';
import { Login } from './login/login';
import { Forbidden } from './forbidden/forbidden';
import { authGuard } from './guard/auth.guard';
import { adminGuard } from './guard/admin.guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'app-forbidden', component: Forbidden },
  { path: 'chaussures', component: Chaussures, canActivate: [authGuard] },
  { path: 'add-chaussure', component: AddChaussure, canActivate: [adminGuard] },
  { path: 'update-chaussure/:id', component: UpdateChaussure, canActivate: [adminGuard] },
  { path: 'recherche-par-modele', component: RechercheParModele, canActivate: [authGuard] },
  { path: 'recherche-par-nom', component: RechercheParNom, canActivate: [authGuard] },
  { path: '', redirectTo: 'chaussures', pathMatch: 'full' },
  { path: '**', redirectTo: 'chaussures' },
];