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

test('parseCommand handles a basic dice roll', async () => {
   Math.random
    .mockReturnValueOnce(0.5) //4
    .mockReturnValueOnce(0.9) // 6
    .mockReturnValue(0.1) // 1

    const message = '$3';
    const result = await parseCommand(message);

    expect(result.embeds[0].data).toHaveProperty('description', '6 from 4 **6** 1 ');
});

test('parseCommand handles too high in basic dice rolls', async () => {
    const message = '$23';
    const result = await parseCommand(message);

    expect(result.embeds[0].data).toHaveProperty('description', "I'm limited to rolling 9 dice at a time. I hope you don't mind!");
});

test.each([
    ['$hello'],
    ['$12abc'],
    ['$']
])('parseCommand handles an unrecognised command', async (message) => {
    const result = await parseCommand(message);

    expect(result.embeds[0].data).toHaveProperty('description', "Command not recognised.");
});

test('parseCommand handles a resistance roll', async () => {
    Math.random
        .mockReturnValueOnce(0.5) // 4
        .mockReturnValueOnce(0.2); // 2

    const message = '$r2';
    const result = await parseCommand(message);

    expect(result.embeds[0].data).toHaveProperty('description', '4 from **4** 2 \nTake 2 stress!');
});

test('parseCommand handles a resistance roll too high in dice', async () => {
    Math.random
        .mockReturnValueOnce(0.5) // 4
        .mockReturnValueOnce(0.2); // 2

    const message = '$r12';
    const result = await parseCommand(message);

    expect(result.embeds[0].data).toHaveProperty('description', "You can't resist with more than 4 dice.");
});

test.each([
    ['$rabc'],
    ['$r12abc'],
    ['$r'],
])('parseCommand handles a malformed resistance roll command', async (message) => {
    const result = await parseCommand(message);

    expect(result.embeds[0].data).toHaveProperty('description', "Command not recognised.");
});
