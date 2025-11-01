const { entangle } = require('./heat.js')
const Math = require('mathjs');


jest.mock('mathjs', () => ({
  ...jest.requireActual('mathjs'),
  random: jest.fn(),
}));

afterEach(() => {
  jest.resetAllMocks();
});


test('return expected result', async () => {
  Math.random.mockReturnValueOnce(0.5)
  .mockReturnValueOnce(0.1);
  
  const result = entangle(4, 2);
  //tbh it makes more sense to just look at the message than hard code it in here
  //i want to test every heat column but can't think of a way that isn't either re-creating logic 
  //or hard coding a loooot of strings
  console.log(result.message);
  expect(result.message).toContain('rogue spirit');
  expect(result.message).toContain('dominant heritage');
  expect(result.message).toContain('selling the same');
  // Mock random to always return 0.5
});

//well. i could just write a test that at least makes sure it doesnt error out
test('return expected result', async () => {
  for(let h = 0; h <= 9; h++){
    for(let w = 0; w <= 4; w++){
      for(let r = 0; r < 6; r++){
        Math.random.mockReturnValueOnce(r/6)
        .mockReturnValueOnce(0.1)
        .mockReturnValueOnce(0.1)
        .mockReturnValueOnce(0.1);

        const result = entangle(h, w);
        expect(result.message).toBeDefined();
        jest.resetAllMocks();
      }
    }
  }
});

test('handle too-high heat', async () => {
  expect(() => entangle(15, 2)).toThrow("You can\'t have that much heat! Raise your wanted level.");
});

test('handle too-high wanted', async () => {
  expect(() => entangle(2, 15)).toThrow('Your wanted level is too high. Seek help.');
});

test('handle negatives', async () => {
  expect(() => entangle(-2, 1)).toThrow('Heat and wanted level must be 0 or greater.');
});