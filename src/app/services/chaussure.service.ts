import { Injectable } from '@angular/core';
import { Chaussure } from '../model/chaussure.model';
import { MODELES } from '../model/modelDeChaussure.model';

const STORAGE_KEY = 'chaussures';

@Injectable({ providedIn: 'root' })
export class ChaussureService {
  liste(): Chaussure[] {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data === null) {
      const depart: Chaussure[] = [
        { id: 1, nom: 'Air Max', prix: 320, taille: 42, modelDeChaussure: MODELES[0] },
        { id: 2, nom: 'Stan Smith', prix: 250, taille: 41, modelDeChaussure: MODELES[1] },
        { id: 3, nom: 'Timberland', prix: 480, taille: 44, modelDeChaussure: MODELES[3] },
      ];
      this.enregistrer(depart);
      return depart;
    }

    let value: unknown;
    try {
      value = JSON.parse(data);
    } catch (error) {
      throw new Error('Les données des chaussures sont illisibles dans le stockage local.', { cause: error });
    }

    if (!Array.isArray(value) || !value.every(this.estChaussure)) {
      throw new Error('Les données des chaussures dans le stockage local ont un format invalide.');
    }
    return value;
  }

  ajouter(chaussure: Chaussure): void {
    const chaussures = this.liste();
    if (chaussures.some((item) => item.id === chaussure.id)) {
      throw new Error('Cet identifiant existe déjà.');
    }
    this.enregistrer([...chaussures, chaussure]);
  }

  modifier(chaussure: Chaussure): void {
    const chaussures = this.liste();
    const index = chaussures.findIndex((item) => item.id === chaussure.id);
    if (index < 0) {
      throw new Error('Cette chaussure est introuvable.');
    }
    chaussures[index] = chaussure;
    this.enregistrer(chaussures);
  }

  supprimer(id: number): void {
    this.enregistrer(this.liste().filter((chaussure) => chaussure.id !== id));
  }

  rechercherParModele(idModel: number): Chaussure[] {
    const chaussures = this.liste();
    return idModel === 0
      ? chaussures
      : chaussures.filter((chaussure) => chaussure.modelDeChaussure.idModel === idModel);
  }

  private enregistrer(chaussures: Chaussure[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chaussures));
  }

  private estChaussure(value: unknown): value is Chaussure {
    if (typeof value !== 'object' || value === null) {
      return false;
    }
    const chaussure = value as Partial<Chaussure>;
    return Number.isInteger(chaussure.id) &&
      typeof chaussure.nom === 'string' &&
      chaussure.nom.trim().length > 0 &&
      typeof chaussure.prix === 'number' &&
      Number.isFinite(chaussure.prix) &&
      chaussure.prix > 0 &&
      typeof chaussure.taille === 'number' &&
      Number.isInteger(chaussure.taille) &&
      chaussure.taille > 0 &&
      typeof chaussure.modelDeChaussure === 'object' &&
      chaussure.modelDeChaussure !== null &&
      MODELES.some((modele) =>
        modele.idModel === chaussure.modelDeChaussure?.idModel &&
        modele.nomModel === chaussure.modelDeChaussure?.nomModel
      );
  }
}
