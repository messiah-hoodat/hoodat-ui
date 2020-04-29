import { sum, greet } from './sum';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('greets the user', () => {
  expect(greet('Rodney')).toBe('Hi there, Rodney');
})