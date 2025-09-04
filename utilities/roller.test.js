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
  expect(data.text).toBe('4 from **4** ');
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
  expect(data.rolls.length).toBe(5);
  expect(data.text).toBe('6 from 4 **6** 1 2 5 ');
});

test('Rolls a 0', () => {
  Math.random
  .mockReturnValueOnce(0.5) // 4
  .mockReturnValueOnce(0.1); // 1
  let data = rollDice(0);

  expect(data.result).toBe(1);
  expect(data.rolls.length).toBe(2);
  expect(data.text).toBe('1 from 4 **1** ');
});

test('Rolling more than 9 dice throws an error', () => {
  expect(() => rollDice(10)).toThrow("I'm limited to rolling 9 dice at a time. I hope you don't mind!");
});

test('Rolling less than 0 dice throws an error', () => {
  expect(() => rollDice(-1)).toThrow("You can't roll less than zero dice...");
});

test('Highest roll less than 3 registers a failure', () => {
  Math.random
    .mockReturnValueOnce(0.2) // 2
    .mockReturnValueOnce(0.1); // 1
  let data = rollDice(2);

  expect(data.result).toBe(2);
  expect(data.type).toBe('failure');
  expect(data.text).toBe('2 from **2** 1 ');
});

test('Highest roll of 3 registers a partial success', () => {
  Math.random
    .mockReturnValueOnce(0.5) // 4
    .mockReturnValueOnce(0.2); // 2
  let data = rollDice(2);

  expect(data.result).toBe(4);
  expect(data.type).toBe('partial');
  expect(data.text).toBe('4 from **4** 2 ');
});

test('Highest roll of 6 registers a success', () => {
  Math.random
    .mockReturnValueOnce(0.9) // 5
    .mockReturnValueOnce(0.2); // 2
  let data = rollDice(2);

  expect(data.result).toBe(6);
  expect(data.type).toBe('success');
  expect(data.text).toBe('6 from **6** 2 ');
});

test('Rolling 2 6s registers a critical success', () => {
  Math.random
    .mockReturnValueOnce(0.9) // 6
    .mockReturnValueOnce(0.9); // 6
  let data = rollDice(2);

  expect(data.result).toBe(6);
  expect(data.type).toBe('critical');
  expect(data.text).toBe('6 from **6** **6** ');
});