const {embedReply, embedRollResult, embedColor} = require('./embedBuilder');
const { picsURL } = require("./consts");

const embedColorInt = parseInt(embedColor, 16); // i guess discord converts ur color to an int man. its hex to int

test('embedReply creates a valid embed', () => {
    let message = "This is a test message";
    let embed = embedReply(message);

    console.log(embed)

    expect(embed.data).toHaveProperty('color', embedColorInt);
    expect(embed.data).toHaveProperty('description', message);
});

test('embedRollResult creates a valid embed', () => {
    let text = "You rolled a 5";
    let type = "success";
    let embed = embedRollResult(text, type);

    expect(embed.data).toHaveProperty('color', embedColorInt);
    expect(embed.data).toHaveProperty('description', text);
    expect(embed.data).toHaveProperty('thumbnail', { url: `${picsURL}${type}.png?raw=true` });
});