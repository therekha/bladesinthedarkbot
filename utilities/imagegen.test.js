const {drawDice, getPics} = require('./imagegen');

 test('whats this thang doo', async () => {
    const rolls = [1, 2, 3, 4, 5, 3,];
    const result = 3;
    const actual = await drawDice(rolls, result, 'test_images/dice.png');

    expect(actual).toBeDefined();
});

test.each([
{rolls:[3,5,6], result: 6, fileName: 'threeDice.png'},
{rolls:[3,5,4,2,4,2,1], result: 5, fileName: 'sevenDice.png'}
])('good results', async (obj) => {
    await drawDice(obj.rolls, obj.result, 'test_images/' + obj.fileName)
});

test('golden dice', async () => {
    result = getPics([2, 3, 4], 4);
    expect(result).toEqual([
        expect.stringContaining('plain/2.png'),
        expect.stringContaining('plain/3.png'),
        expect.stringContaining('gold/4.png')
    ]);
});
