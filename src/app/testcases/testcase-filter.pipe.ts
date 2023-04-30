import { Pipe, PipeTransform } from '@angular/core';
import { TestCase } from './test-case';

@Pipe({
  name: 'testcaseFilter',
  pure: false
})
export class TestcaseFilterPipe implements PipeTransform {

  transform(value: TestCase[], args?: string): TestCase[] {
    if (!value) return null;
    if (!args) return value;
    args = args.toLocaleLowerCase().replace(' ', '');

    return value.filter(testcase => testcase.name.toLowerCase().replace(' ', '') === args)
  }

}
