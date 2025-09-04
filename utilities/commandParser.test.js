const {parseCommand} = require('./commandParser');
const Math = require('mathjs');


jest.mock('mathjs', () => ({
  ...jest.requireActual('mathjs'),
  random: jest.fn(),
}));

afterEach(() => {
  jest.resetAllMocks();
});

jest.mock('mathjs', () => ({
  ...jest.requireActual('mathjs'),
  random: jest.fn()
}));

test('parseCommand handles a basic dice roll', () => {
   Math.random
    .mockReturnValueOnce(0.5) //4
    .mockReturnValueOnce(0.9) // 6
    .mockReturnValue(0.1) // 1

    const message = '$3';
    const result = parseCommand(message);

    expect(result.data).toHaveProperty('description', '6 from 4 **6** 1 ');
});

test('parseCommand handles too high in basic dice rolls', () => {
    const message = '$23';
    const result = parseCommand(message);

    expect(result.data).toHaveProperty('description', "I'm limited to rolling 9 dice at a time. I hope you don't mind!");
});

test('parseCommand handles an unrecognised command', () => {
    const message = '$hello';
    const result = parseCommand(message);

    expect(result.data).toHaveProperty('description', "Command not recognised.");
});