import { ModelDeChaussure } from './modelDeChaussure.model';

export interface Chaussure {
  id: number;
  nom: string;
  prix: number;
  taille: number;
  modelDeChaussure: ModelDeChaussure;
}
