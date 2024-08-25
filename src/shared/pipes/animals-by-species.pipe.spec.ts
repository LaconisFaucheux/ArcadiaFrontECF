import { AnimalsBySpeciesPipe } from './animals-by-species.pipe';

describe('AnimalsBySpeciesPipe', () => {
  it('create an instance', () => {
    const pipe = new AnimalsBySpeciesPipe();
    expect(pipe).toBeTruthy();
  });
});
