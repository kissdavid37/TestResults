import { Pipe, PipeTransform } from '@angular/core';
import { TestRun } from './test-run';

@Pipe({
  name: 'testrunFilter',
  pure: false
})
export class TestrunFilterPipe implements PipeTransform {

  transform(value: TestRun[], args?: any): TestRun[] {
    if (!value) return null;
    if (!args) return value;
    if (args == 'Choose...') return value
    return value.filter(testrun => testrun.version == args)
  }

}
