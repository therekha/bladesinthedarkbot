const { rollDice } = require('./roller.js')
const Math = require('mathjs');


jest.mock('mathjs', () => ({
  ...jest.requireActual('mathjs'),
  random: jest.fn(),
}));

afterEach(() => {
  jest.resetAllMocks();
});

test('Rolls a single die', () => {
  Math.random.mockReturnValue(0.5); //4
  let data = rollDice(1);

  
  expect(data.result).toBe(4)
  expect(data.rolls.length).toBe(1);
});

test('Rolls 5 dice', () => {
    Math.random
    .mockReturnValueOnce(0.5) //4
    .mockReturnValueOnce(0.9) // 6
    .mockReturnValueOnce(0.1) // 1
    .mockReturnValueOnce(0.3) // 2
    .mockReturnValueOnce(0.7); // 5
  let data = rollDice(5);

  expect(data.result).toBe(6);

  expect(rolls.length).toBe(5);
});

test('Rolls a 0', () => {
  Math.random
  .mockReturnValueOnce(0.5) // 4
  .mockReturnValueOnce(0.1); // 1
  let data = rollDice(0);

  expect(data.result).toBe(1);
  expect(rolls.length).toBe(2);
});

test('Rolling more than 20 dice throws an error', () => {
  expect(() => rollDice(21)).toThrow("I'm limited to rolling 20 dice at a time. I hope you don't mind!");
});

test('Rolling less than 0 dice throws an error', () => {
  expect(() => rollDice(-1)).toThrow("You can't roll less than zero dice...");
});