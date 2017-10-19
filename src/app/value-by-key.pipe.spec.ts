import { ValueByKeyPipe } from './value-by-key.pipe';

describe('ValueByKeyPipe', () => {
  it('create an instance', () => {
    const pipe = new ValueByKeyPipe();
    expect(pipe).toBeTruthy();
  });
});
