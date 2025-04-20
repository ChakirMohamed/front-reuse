// mdh-currency.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({ name: 'mdhCurrency' })
export class MdhCurrencyPipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe) {}

  transform(value: number | string, digitsInfo: string = '1.2-2'): string {
    if (value === null || value === undefined) return '';
    const formatted = this.decimalPipe.transform(value, digitsInfo);
    return formatted ? `${formatted} MDH` : '';
  }
}
