import { afterEach, describe, expect, it } from 'vitest';
import { ChaussureService } from './chaussure.service';

describe('ChaussureService', () => {
  const service = new ChaussureService();

  afterEach(() => localStorage.clear());

  it('initializes the starter shoes when storage is empty', () => {
    expect(service.liste().map((chaussure) => chaussure.nom)).toEqual([
      'Air Max',
      'Stan Smith',
      'Timberland',
    ]);
  });

  it('adds a shoe and rejects a duplicate identifier', () => {
    const shoe = service.liste()[0];

    expect(() => service.ajouter(shoe)).toThrow('Cet identifiant existe déjà.');
    service.ajouter({ ...shoe, id: 4, nom: 'Nouvelle chaussure' });
    expect(service.liste().map((chaussure) => chaussure.id)).toContain(4);
  });

  it('updates and deletes a shoe', () => {
    const [shoe] = service.liste();
    const updated = { ...shoe, nom: 'Modèle modifié' };
    service.modifier(updated);
    expect(service.liste()[0].nom).toBe('Modèle modifié');

    service.supprimer(updated.id);
    expect(service.liste().some((chaussure) => chaussure.id === updated.id)).toBe(false);
  });

  it('rejects updates for a missing shoe', () => {
    const shoe = { ...service.liste()[0], id: 999 };

    expect(() => service.modifier(shoe)).toThrow('Cette chaussure est introuvable.');
  });

  it('filters by shoe model and returns all shoes for model zero', () => {
    expect(service.rechercherParModele(1).every(
      (chaussure) => chaussure.modelDeChaussure.idModel === 1,
    )).toBe(true);
    expect(service.rechercherParModele(0)).toHaveLength(3);
  });

  it('reports malformed stored data instead of treating it as an empty list', () => {
    localStorage.setItem('chaussures', '{');

    expect(() => service.liste()).toThrow('Les données des chaussures sont illisibles');
  });

  it('rejects stored shoes with an invalid shape', () => {
    localStorage.setItem('chaussures', JSON.stringify([{ id: 1, nom: '' }]));

    expect(() => service.liste()).toThrow('ont un format invalide');
  });
});
