import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], search: any): any[] {
    if (!items) return [];
    if (!search) return items;
    search = search.toLowerCase();
    return items.filter(it => {
      return (it.studentId.toLowerCase().includes(search) || 
      it.lastname.toLowerCase().includes(search) || 
      it.course.toLowerCase().includes(search) || 
      it.batch.toLowerCase().includes(search) ||
      it.sex.toLowerCase().includes(search) ||
      it.soNumber.toLowerCase().includes(search));
    });
  }
}
