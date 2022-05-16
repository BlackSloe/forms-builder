import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'separate',
    pure: true
})
export class SeparatorPipe implements PipeTransform {
    transform(value: string, ...args: any[]) {
        return value.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
    }
};
