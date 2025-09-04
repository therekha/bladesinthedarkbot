const {drawDice} = require('./imagegen');

 test('whats this thang doo', async () => {
    const rolls = [1, 2, 3, 4, 5];
    const result = 3;
    const actual = await drawDice(rolls, result, 'test_images/dice.png');

    expect(actual).toBeDefined();
});
