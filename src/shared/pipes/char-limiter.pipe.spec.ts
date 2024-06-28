import { CharLimiterPipe } from './char-limiter.pipe';

describe('CharLimiterPipe', () => {
  it('create an instance', () => {
    const pipe = new CharLimiterPipe();
    expect(pipe).toBeTruthy();
  });
});
