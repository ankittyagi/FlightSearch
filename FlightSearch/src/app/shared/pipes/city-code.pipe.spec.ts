import { CityCodePipe } from './city-code.pipe';

describe('CityCodePipe', () => {
   let pipe: CityCodePipe;
   beforeEach(() => {
      pipe = new CityCodePipe();
   });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('should return forst three letters of input string', () => {
      expect(pipe.transform('DELHI')).toBe('DEL');
   });
   it('should handle empty input string', () => {
      expect(pipe.transform('')).toBe('');
   });
});
