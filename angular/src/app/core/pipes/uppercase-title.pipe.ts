import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercaseTitle',
  standalone: true
})
export class UppercaseTitlePipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    if(value==='' || value===null || value===undefined) return '';
    let uppercased = value.toUpperCase(); 
    
    return uppercased;
  }

}
