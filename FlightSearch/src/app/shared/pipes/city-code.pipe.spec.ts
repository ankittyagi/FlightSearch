import { CityCodePipe } from './city-code.pipe';

describe('CityCodePipe', () => {
  it('create an instance', () => {
    const pipe = new CityCodePipe();
    expect(pipe).toBeTruthy();
  });
});
