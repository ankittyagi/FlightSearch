import { TimeOnlyFormatPipe } from './time-only-format.pipe';

describe('TimeOnlyFormatPipe', () => {
   let pipe: TimeOnlyFormatPipe;
   beforeEach(() => {
      pipe = new TimeOnlyFormatPipe();
   });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

 it('should return HH:MM from input time', () => {
     expect(pipe.transform('2018-08-26 12:10:00')).toBe('12:10');
  });
  it('should handle empty input string', () => {
     expect(pipe.transform('')).toBe('00:00');
  });
  it('should handle wrong input', () => {
   expect(pipe.transform('2018-08-26-12:10:00')).toBe('00:00');
   });
   it('should handle wrong input', () => {
      expect(pipe.transform('2018-08-26-12:1000')).toBe('00:00');
   });
});
