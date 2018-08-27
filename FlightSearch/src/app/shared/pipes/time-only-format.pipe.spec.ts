import { TimeOnlyFormatPipe } from './time-only-format.pipe';

describe('TimeOnlyFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new TimeOnlyFormatPipe();
    expect(pipe).toBeTruthy();
  });
});
