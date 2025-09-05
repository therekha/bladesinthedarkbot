const { actions, actionDescriptions, describeAction, pullDevilsBargain } = require('./lookups');
const { repoURL } = require("./consts");

test.each(actions) ('describeAction returns a description for %s', (action) => {
    //ik this is one of those tests thats just rewriting the code but . yknow
    const description = describeAction(action);
    expect(description).toBe(actionDescriptions[action]);
});

test('describeAction returns default message for unknown action', () => {
    const description = describeAction('unknownAction');
    expect(description).toBe("I don't know that action.");
});

test('pullDevilsBargain returns a valid bargain', () => {
    const bargain = pullDevilsBargain();
    expect(bargain.text).toBe('You pull a devil\'s bargain!');
    expect(bargain.image).toEqual(expect.stringContaining(repoURL + 'devils_bargains/'));
});