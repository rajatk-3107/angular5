import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) {return []; }
    if (!searchText) {return items; }
    let search: any;
    let name: string;
    search = (typeof parseInt(searchText, 10) === 'number') ? searchText : searchText.toLowerCase();
    return items.filter( it => {
      if (parseInt(search, 10) != search) {
        name = it.name.toLowerCase();
        if (name.includes(search.toLowerCase())) {
          return it;
        }
      } else {
        if (it.phone.toString().includes(search)) {
          return it;
        }
      }
    });
   }

}
