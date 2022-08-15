import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], value: string, prop: string): any {

    if (value === '') return;
    return items.filter(singleItem =>
        singleItem[prop].toLowerCase().includes(value.toLowerCase())
    );

}

}
