const {repoURL} = require("./consts");

const actions = [
    'attune',
    'command',
    'consort',
    'finesse',
    'hunt',
    'prowl',
    'skirmish',
    'study',
    'survey',
    'sway',
    'tinker',
    'wreck'
];

const actionDescriptions = {
 attune:`When you **Attune**, you open your mind to the ghost field or other arcane power.

*You might communicate with a ghost or understand aspects of spectrology. You could try to perceive beyond sight in order to better understand your situation (but Surveying might be better).*`,
command: `When you **Command**, you compel swift obedience.

*You might intimidate or threaten to get what you want. You might lead a gang in a group action. You could try to order people around to persuade them (but Consorting might be better).*`,
 consort: `When you **Consort**, you socialize with friends and contacts.

*You might gain access to resources, information, people, or places. You might make a good impression or win someone over with your charm and style. You might make new friends or connect with your heritage or background. You could try to manipulate your friends with social pressure (but Sway might be better).*`,
finesse: `When you **Finesse**, you employ dextrous manipulation or subtle misdirection.

*You might pick someone’s pocket. You might handle the controls of a vehicle or direct a mount. You might formally duel an opponent with graceful fighting arts. You could try to employ those arts in a chaotic melee (but Skirmishing might be better). You could try to pick a lock (but Tinkering might be better).*`,
hunt: `When you **Hunt**, you carefully track a target.

*You might follow a target or discover their location. You might arrange an ambush. You might attack with precision shooting from a distance. You could try to bring your guns to bear in a melee (but Skirmishing might be better).*`,
prowl: `When you **Prowl**, you traverse skillfully and quietly.

*You might sneak past a guard or hide in the shadows. You might run and leap across the rooftops. You might attack someone from hiding with a back- stab or blackjack. You could try to waylay a victim in the midst of battle (but Skirmishing might be better).*`,
skirmish: `When you **Skirmish**, you entangle a target in close combat so they can’t easily escape.

*You might brawl or wrestle with them. You might hack and slash. You might seize or hold a position in battle. You could try to fight in a formal duel (but Finessing might be better).*`,

study: `When you **Study**, you scrutinize details and interpret evidence.

*You might gather information from documents, newspapers, and books. You might do research on an esoteric topic. You might closely analyze a person to detect lies or true feelings. You could try to examine events to understand a pressing situation (but Surveying might be better).*`,

survey: `When you **Survey**, you observe the situation and anticipate outcomes.

*You might spot telltale signs of trouble before it happens. You might uncover opportunities or weaknesses. You might detect a person’s motivations or intentions. You could try to spot a good ambush point (but Hunting might be better).*`,

sway: `When you **Sway**, you influence with guile, charm, or argument.

*You might lie convincingly. You might persuade someone to do what you want. You might argue a compelling case that leaves no clear rebuttal. You could try to trick people into affection or obedience (but Consorting or Commanding might be better).*`,

tinker: `When you **Tinker**, you fiddle with devices and mechanisms.

*You might create a new gadget or alter an existing item. You might pick a lock or crack a safe. You might disable an alarm or trap. You might turn the clockwork and electroplasmic devices around the city to your advantage. You could try to use your technical expertise to control a vehicle (but Finessing might be better).*`,
wreck: `When you **Wreck**, you unleash savage force.

*You might smash down a door or wall with a sledgehammer, or use an explosive to do the same. You might employ chaos or sabotage to create a distraction or overcome an obstacle. You could try to overwhelm an enemy with sheer force in battle (but Skirmishing might be better).*`
};

const describeAction = (ability) => {
    ability = ability.toLowerCase();
    return actionDescriptions[ability] || "I don't know that action.";
}

const pullDevilsBargain =  () => {
	result = Math.floor(Math.random() * 50 + 1);
	imageLink = repoURL + 'devils_bargains/DevilsBargain-'
	 + result.toString() + '.png?raw=true'
	return {text: 'You pull a devil\'s bargain!', image: imageLink};
}

const help = () => {
    return `
There's slash commands or:

## Rolling Dice
\` $2 \`  Rolls 2 d6s
\` $r3 \` Resistance roll of 3 d6s.
\` $entangle <heat> <wanted level> \` Roll on the expanded entanglement table.

## Other Commands
\` $action <action name> \` Look up the definition of an action.
\` $db \` Pull a random devil's bargain.

[GitHub Repo](${repoURL})
Credits: [Devil's Bargain Cards](https://docs.google.com/document/d/1VF40zxIj2l1kNJ3kR1KhjesQc7Wr3crH/edit?usp=sharing&ouid=110046508991315423814&rtpof=true&sd=true), [Expanded Entanglements](https://drive.google.com/file/d/1cL9f2LXwr_CZ5C-Ce6c82higXtILaLRm/view)
`
}

module.exports = { actions, actionDescriptions, describeAction, pullDevilsBargain, help };