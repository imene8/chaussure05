import { Pipe, PipeTransform } from '@angular/core';
import { Chaussure } from './model/chaussure.model';

@Pipe({
  name: 'searchFilter',
  standalone: true
})
export class SearchFilterPipe implements PipeTransform {
  transform(list: Chaussure[] | null | undefined, filterText: string): Chaussure[] {
    if (!list) {
      return [];
    }
    if (!filterText) {
      return list;
    }
    const texte = filterText.trim().toLocaleLowerCase();
    return list.filter((item) => item.nom.toLocaleLowerCase().includes(texte));
  }
}
