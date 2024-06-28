import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'charLimiter',
  standalone: true
})
export class CharLimiterPipe implements PipeTransform {

  transform(value: string, limit: number): string {
    return value.substring(0, limit) + '...';
  }

}
