const { rollDice, resistRoll } = require('./roller.js')
const { entangle } = require('./heat.js')
const Math = require('mathjs');


jest.mock('mathjs', () => ({
  ...jest.requireActual('mathjs'),
  random: jest.fn(),
}));

afterEach(() => {
  jest.resetAllMocks();
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
    expect(data.text).toBe('6 from 4 **6** 1 2 5 ');
    expect(data.type).toBe('success');
    expect(data.rolls.length).toBe(5);
});


test.each([
{heat: 0, wantedLevel: 0, rng: 1}
])('return expected result', async (obj) => {
    await drawDice(obj.rolls, obj.result, 'test_images/' + obj.fileName)
});
