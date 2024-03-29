import { Dice, Token, type Form, type Style, type Archetype, type Build } from './types';
export const forms: Form[] = [
	{
		ability: {
			description:
				"Your Actions may apply to one extra target within range. When you add Blaster Form to a Style, increase that Style's maximum range by 1"
		},
		actionDice: [Dice.d8, Dice.d8, Dice.d8],
		name: 'Blaster',
		actions: [
			{
				name: 'Amplify',
				levels: [
					{
						diceCost: [3],
						description:
							'Your next Action this turn has its range increased by 2 and may apply to up to three extra targets within range'
					}
				]
			},
			{
				name: 'Shockwave',
				levels: [
					{
						diceCost: [3],
						description: 'Deal 1 damage to every enemy within range.'
					},
					{
						diceCost: [6],
						description: 'Deal 2 damage to one enemy within range'
					}
				]
			}
		]
	},
	{
		ability: {
			description:
				'When an enemy within range takes an action you can spend one Control token to negate it or two control tokens to redirect it.\nYou may only use Control tokens once per turn. If you negate an action they lose the number they spent and the action does not happen.\nIf you redirect an action you choose all targets and make all decisions for that action'
		},
		actionDice: [Dice.d10, Dice.d8, Dice.d6, Dice.d4],
		name: 'Control',
		actions: [
			{
				name: 'Suppression',
				levels: [
					{
						diceCost: [3],
						description: 'You gain 1 Control token and move 1 space.'
					},
					{
						diceCost: [6],
						description: '6+ you gain 1 Control token'
					},
					{
						diceCost: [9],
						description: '9+ You gain one control token and can move one space'
					}
				]
			}
		]
	},
	{
		ability: {
			description:
				'After you Throw or Grapple someone, you gain X Speed tokens, where X is how many spaces you moved them.\nAfter each space you move using Free Movement, you may choose someone within range and pull them 1 space'
		},
		actionDice: [Dice.d10, Dice.d8, Dice.d6],
		name: 'Dance',
		actions: [
			{
				name: 'Try to Keep Up',
				levels: [
					{
						tokenCost: [
							{
								number: 3,
								tokenType: Token.Speed
							}
						],
						description: 'Move two spaces, then heal 2.'
					}
				]
			}
		]
	},
	{
		ability: {
			description:
				'You have Armor. When you gain Speed tokens, replace half of them (rounded up) with Iron tokens'
		},
		actionDice: [Dice.d8, Dice.d6, Dice.d6],
		name: 'Iron',
		actions: [
			{
				name: 'Secure',
				levels: [
					{
						diceCost: [3],
						description:
							'Choose two: you gain 3 Iron tokens; an ally within range gains 2 Iron tokens; or heal someone within range'
					}
				]
			},
			{
				name: 'Contain',
				levels: [
					{
						diceCost: [3],
						description:
							'Choose two: pull an enemy 2 spaces; Challenge an enemy you can see; or place a trap into a space within range'
					}
				]
			},
			{
				name: 'Protect',
				levels: [
					{
						diceCost: [6],
						description: 'Choose 4 from the Secure and/or Contain lists'
					}
				]
			}
		]
	},
	{
		ability: {
			description:
				'After you deal damage to an enemy with an Action, you hit them again for 1 damage'
		},
		actionDice: [Dice.d6, Dice.d6, Dice.d4, Dice.d4],
		name: 'One-Two',
		actions: [
			{
				name: 'Slide In',
				levels: [
					{
						diceCost: [1],
						description: 'Teleport 2 spaces'
					}
				]
			},
			{
				name: 'Whirlwind',
				levels: [
					{
						diceCost: [4],
						description: 'Deal 1 damage to up to three enemies within range'
					}
				]
			}
		]
	},
	{
		ability: {
			description:
				'When you gain Speed tokens, replace half of them (rounded up) with Power tokens.\nYou may spend up to 3 Power tokens per hit'
		},
		actionDice: [Dice.d10, Dice.d10, Dice.d4],
		name: 'Power',
		actions: [
			{
				name: 'Yell',
				levels: [
					{
						diceCost: [3],
						description: 'You gain 3 Power tokens'
					}
				]
			},
			{
				name: 'Crush',
				levels: [
					{
						diceCost: [6],
						description:
							'Deal 3 damage to an enemy within range. This damage cannot be reduced by Armor and ignores Shields. Tokens and Abilities cannot be used in response to Crush or the damage it deals.'
					},
					{
						diceCost: [9],
						description: '9+: You may spend any number of Power tokens on this hit'
					}
				]
			}
		]
	},
	{
		ability: {
			description:
				'You have Armor. You do not discard your Speed tokens at the end of a turn.\nYou may only take one Action per turn.\nYour Action Pool does not empty between Turns or Rounds'
		},
		actionDice: [Dice.d8, Dice.d8, Dice.d6, Dice.d4],
		name: 'Reversal',
		actions: [
			{
				name: 'Counter Attack',
				levels: [
					{
						diceCost: [1],
						description:
							'Teleport within range of an enemy that dealt damage to you this turn, then spend this number on another Action. That Action must target the enemy you teleported to'
					}
				]
			}
		]
	},
	{
		ability: {
			description:
				'At the start and end of your turn, you gain 2 Speed tokens\nYou do not discard your Speed tokens at the end of a turn.'
		},
		actionDice: [Dice.d4, Dice.d4, Dice.d4, Dice.d4, Dice.d4, Dice.d4],
		name: 'Shadow',
		actions: [
			{
				name: 'Stunt',
				levels: [
					{
						tokenCost: [
							{
								number: 3,
								tokenType: Token.Speed
							}
						],
						description:
							'Place one Fog, Copy, or Trap obstacle into an adjacent space, then teleport two spaces'
					}
				]
			}
		]
	},
	{
		ability: {
			description:
				'At the start of each turn choose a song; Iron, Power or Speed. You gain three tokens of the chosen type and each of your allies gain 1 of that type'
		},
		actionDice: [Dice.d8, Dice.d6, Dice.d6, Dice.d4],
		name: 'Song',
		actions: [
			{
				name: 'Sing Along',
				levels: [
					{
						diceCost: [1],
						description:
							'Choose one ally you can see. Choose one: They remove one token they hold; they heal; or they gain 2 tokens from your song.'
					},
					{
						diceCost: [4],
						description: 'They also choose one from the list.'
					},
					{
						diceCost: [6],
						description:
							'Add a 4 to their Action Pool. They must immediately spend it on an Action.'
					}
				]
			}
		]
	},
	{
		ability: {
			description:
				'At the start of your turn, either heal or discard one token you hold. At the end of your turn, choose an enemy in range and give them one Weakness token'
		},
		actionDice: [Dice.d6, Dice.d6, Dice.d6, Dice.d6],
		name: 'Vigilance',
		actions: [
			{
				name: 'Bow Down',
				levels: [
					{
						diceCost: [1],
						description: 'Give one weakness token to an enemy within range.'
					},
					{
						diceCost: [4],
						description: 'give two weakness tokens to an enemy within range'
					}
				]
			},
			{
				name: 'Stand Strong',
				levels: [
					{
						diceCost: [1],
						description: 'Heal yourself or an ally you can see.'
					},
					{
						diceCost: [4],
						description: 'heal yourself or a different ally you can see'
					}
				]
			}
		]
	},
	{
		ability: {
			description:
				'At the start of your turn, for each of these that is true, add 1d6 to your Action Dice\n-Your current Health Bar is at half HP or less\n-Someone on your team is Taken Out\n-You are holding a non-basic Token'
		},
		actionDice: [Dice.d10, Dice.d6, Dice.d6],
		name: 'Wild',
		actions: [
			{
				name: 'Fury',
				levels: [
					{
						tokenCost: [
							{
								number: 2,
								tokenType: Token.Basic
							}
						],
						description:
							'Deal 1 damage to an enemy within range.\nAt the end of this turn, push that enemy 1 space.\nFury can be used only 3 times per turn'
					}
				]
			}
		]
	},
	{
		ability: {
			description:
				"Your Action Pool is predetermined: 7, 5, 3, 1. You may hold multiple Shields at a time. Only one Shield is active at a time. When your active Shield breaks, your next Shield doesn't become active until the end of the current turn.\nWhen an enemy damages or breaks your Shield, you deal 1 damage to them"
		},
		actionDice: [7, 5, 3, 1],
		name: 'Zen',
		actions: [
			{
				name: 'Focus',
				levels: [
					{
						diceCost: [3],
						description: 'You gain a 2 point Shield. You may move one space.'
					},
					{
						diceCost: [7],
						description: 'You gain a 4 point Shield. You may move two spaces'
					}
				]
			}
		]
	}
];
export const archetypes: Archetype[] = [
	{
		name: 'Angel',
		focusedAbility: {
			description:
				'At the start of your turn, Challenge an enemy you can see, then deal 1 damage to them, then heal 1. After you Challenge an enemy, deal 1 damage to them and heal 1.'
		},
		franticAbility: {
			description:
				'At the start of this turn, Challenge an enemy you can see, then deal 2 damage to them, then heal.'
		},
		fusedAbility: {
			description:
				'At the start of your turn, Challenge an enemy you can see, then deal 1 damage to them, then heal 1. After you Challenge an enemy, deal 1 damage to them and heal 1.'
		}
	},
	{
		name: 'Cavalry',
		focusedAbility: {
			description:
				"At the start and end of your turn, you and each ally adjacent to you gains a 2 point Shield. When your Shield or an ally's Shield breaks, you gain 1 Speed token"
		},
		franticAbility: {
			description:
				'At the start and end of this turn, you and each ally adjacent to you gains a 2 point shield'
		},
		fusedAbility: {
			description:
				'At the end of your turn, you and each ally adjacent to you gains a 2 point shield'
		}
	},
	{
		name: 'Cyborg',
		focusedAbility: {
			description: 'At the start of your turn, you gain four Basic Tokens of your choice.'
		},
		franticAbility: {
			description: 'At the start of this turn, you gain four Basic Tokens of your choice.'
		},
		fusedAbility: {
			description: 'At the start of your turn, you gain two Basic Tokens of your choice.'
		}
	},
	{
		name: 'Demon',
		focusedAbility: {
			description: 'At the end of your turn, you gain 2 Chaos tokens.'
		},
		franticAbility: {
			description: 'At the end of this turn, you gain 2 Chaos tokens.'
		},
		fusedAbility: {
			description: 'At the end of your turn, you gain 1 Chaos token.'
		}
	},
	{
		name: 'Flametongue',
		focusedAbility: {
			description:
				'After you deal damage to an enemy with an Action, give that enemy one Burning token'
		},
		franticAbility: {
			description:
				'During this turn, after you deal damage to an enemy with three or less Burning tokens, give them one Burning token'
		},
		fusedAbility: {
			description:
				'The first time you deal damage to an enemy during your turn, give that enemy two Burning tokens'
		}
	},
	{
		name: 'Gunkata',
		focusedAbility: {
			description:
				'At the start of your turn, push every adjacent enemy one space, the move one space. At the end of your turn, deal 1 damage to each enemy within range.'
		},
		franticAbility: {
			description:
				'At the end of this turn, you may move one space, then deal 1 damage to each enemy within range. Then, you may move one space'
		},
		fusedAbility: {
			description: 'At the end of your turn, deal 1 damage to each enemy within range.'
		}
	},
	{
		name: 'Phantom',
		focusedAbility: {
			description:
				"You have access to all of your Styles' Unique Actions at all times, no matter what your current Stance is. All of your Unique Actions have their cost reduced by 1 (to a minimum of 1+ or 2 tokens"
		},
		franticAbility: {
			description:
				'You have access to all of your Unique Actions this turn, no matter what your current Style and Form are. Your Unique Actions have their cost reduced by 1 (to a minimum of 1+ or 2 tokens'
		},
		fusedAbility: {
			description:
				'Your Unique Actions have their cost reduced by 1 (to a minimum of 1+ or 2 tokens)'
		}
	},
	{
		name: 'Punk',
		focusedAbility: {
			description:
				'At the start of your turn, add X to your Action Pool. X is equal to twice the damage on your current health bar. If your health bar is full, X = 1'
		},
		franticAbility: {
			description:
				'At the start of this turn, add X to your Action Pool. X is equal to twice the damage on your current health bar. If your health bar is full, X = 1'
		},
		fusedAbility: {
			description:
				'At the start of your turn, add X to your Action Pool. X is equal to the damage on your current health bar. If your health bar is full, X = 1'
		}
	},
	{
		name: 'Teacher',
		focusedAbility: {
			description: 'At the end of your turn, you gain two Inspired tokens.'
		},
		franticAbility: {
			description: 'At the end of this turn, you gain two Inspired tokens.'
		},
		fusedAbility: {
			description: 'At the end of your turn, you gain an Inspired token.'
		}
	},
	{
		name: 'Trickster',
		focusedAbility: {
			description:
				'You may spend any tokens you hold as if they were Iron tokens. When you spend Iron tokens to reduce the damage you take, push your attacker 1 space, then you may move 1 space'
		},
		franticAbility: {
			description:
				'Until your next turn, you may spend any tokens you hold as if they were Iron tokens. When you spend Iron tokens to reduce the damage you take, push your attacker 1 space, then you may move 1 space'
		},
		fusedAbility: {
			description:
				'You may spend any basic tokens you hold as if they were Iron tokens. When you spend Iron tokens to reduce the damage you take, you may move 1 space'
		}
	},
	{
		name: 'Underdog',
		focusedAbility: {
			description:
				'At the start of your turn, you gain one Basic token of your choice.\nAfter you take damage, you gain one Basic token of your choice'
		},
		franticAbility: {
			description:
				'At the start of this turn, you gain one Basic token of your choice.\nUntil your next turn, after you take damage, you gain one Basic token of your choice'
		},
		fusedAbility: {
			description:
				'At the start of your turn, you gain one Basic token of your choice. After you take damage, you gain one Basic token of your choice. You cannot choose a Basic token you are already holding.'
		}
	},
	{
		name: 'Wardancer',
		focusedAbility: {
			description:
				'After rolling your Action Dice, either increase all of your numbers by 1, or increase one of your number by 4'
		},
		franticAbility: {
			description:
				'After rolling your Action Dice this turn, either increase all of your numbers by 1, or increase one of your number by 4'
		},
		fusedAbility: {
			description: 'After rolling your Action Dice, increase two of your numbers by 2'
		}
	},
	{
		name: 'Winterblossom',
		focusedAbility: {
			description: 'At the start of every turn, give 1 Weakness token to one enemy within range'
		},
		franticAbility: {
			description:
				'At the start and end of this turn, give 1 Weakness token to one enemy within range'
		},
		fusedAbility: {
			description:
				'At the start and end of your turn, give 1 Weakness token to one enemy within range'
		}
	}
];
export const styles: Style[] = [
	{
		parentArchetypeName: 'Angel',
		name: 'Halcyon',
		minRange: 1,
		maxRange: 2,
		ability: {
			description:
				'At the start of your turn, remove one token you hold.\nAfter you remove tokens using an Action or Ability, you gain an equal number of Iron tokens.'
		},
		actions: [
			{
				name: 'Purify',
				levels: [
					{
						diceCost: [1],
						description: 'Remove one token from yourself or an ally within range.'
					},
					{
						diceCost: [3],
						description: 'Remove up to two tokens from someone within range.'
					},
					{
						diceCost: [6],
						description: 'Remove up to two tokens from someone within range.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Angel',
		name: 'Judgment',
		minRange: 1,
		maxRange: 1,
		ability: {
			description:
				'When an enemy with your Challenge starts their turn, they do not roll their lowest Action Die. It is discarded and unused.'
		},
		actions: [
			{
				name: 'Denial',
				levels: [
					{
						diceCost: [5],
						description: 'Teleport adjacent to an enemy you can see, and Challenge them.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Angel',
		name: 'Shining',
		minRange: 1,
		maxRange: 1,
		ability: {
			description:
				'At the start of your turn, all obstacles and enemies adjacent to you are pushed one space.\nEnemies cannot move into the spaces adjacent to you.'
		},
		actions: [
			{
				name: 'Beacon',
				levels: [
					{
						diceCost: [1],
						description: 'Pull one ally up to three spaces. You and that ally heal 1.'
					},
					{
						diceCost: [4],
						description: 'That ally heals.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Angel',
		name: 'Singing',
		minRange: 2,
		maxRange: 4,
		ability: {
			description:
				'At the start and end of your turn, you gain a 2 point Shield.\nAfter each Action you perform, if you have an active Shield, increase its value by 1.'
		},
		actions: [
			{
				name: 'Symphony',
				levels: [
					{
						otherCost: ['Destroy Your Active Shield'],
						description:
							'Symphony is a Token Action, but the cost is your Active Shield.\nChoose two: Pull an ally 3 spaces; an ally within range heals; Challenge an enemy within range; an enemy within range is pushed 3 spaces; or destroy an obstacle within range.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Angel',
		name: 'Winged',
		minRange: 1,
		maxRange: 2,
		ability: {
			description:
				'Edges cannot remove you from play.\nAt the end of every turn, you may move two spaces.'
		},
		actions: [
			{
				name: 'As The Crow Flies',
				levels: [
					{
						diceCost: [1],
						description: 'Teleport three or four spaces.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Cavalry',
		name: 'Charging',
		minRange: 1,
		maxRange: 1,
		ability: {
			description:
				"At the start of your turn, you may move 2 spaces.\nAt the start of each ally's turn, they may move 2 spaces."
		},
		actions: [
			{
				name: 'Follow My Lead',
				levels: [
					{
						diceCost: [3],
						description:
							'You may move one space, then deal 1 damage to an enemy within range. An ally you can see may move one space, then deal 1 damage to an enemy within their range.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Cavalry',
		name: 'Heroic',
		minRange: 1,
		maxRange: 2,
		ability: {
			description:
				'Whenever an ally within range takes damage, they take half that damage (rounded down) and you take the other half (rounded up).'
		},
		actions: [
			{
				name: 'Burning Heart',
				levels: [
					{
						diceCost: [4],
						description: 'You and each ally within range gains 2 Iron tokens.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Cavalry',
		name: 'Jumping',
		minRange: 1,
		maxRange: 1,
		ability: {
			description: 'At the start and end of your turn, you may teleport one, two, or three spaces.'
		},
		actions: [
			{
				name: 'Leap In',
				levels: [
					{
						diceCost: [4],
						description:
							'Teleport up to three spaces.\nYou may deal 2 damage to an enemy within range.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Cavalry',
		name: 'Rallying',
		minRange: 1,
		maxRange: 1,
		ability: {
			description:
				"At the end of your turn, you and each ally within range heals.\nAt the start of each ally's turn, if they are within range of you, they may heal."
		},
		actions: [
			{
				name: 'Group Up',
				levels: [
					{
						diceCost: [2],
						description: 'Pull one ally up to 3 spaces.'
					},
					{
						diceCost: [3],
						description: 'Pull one ally up to 4 spaces.'
					},
					{
						diceCost: [5],
						description: 'Each pulled ally heals.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Cavalry',
		name: 'Unbreakable',
		minRange: 1,
		maxRange: 2,
		ability: {
			description:
				'After each Action you perform, give one Iron token to an ally other than yourself within range.\nYour allies within range may spend your tokens.'
		},
		actions: [
			{
				name: 'Eyes Open',
				levels: [
					{
						diceCost: [4],
						description: 'You gain 6 Iron tokens and 1 Weakness token.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Cyborg',
		name: 'Armored',
		minRange: 1,
		maxRange: 2,
		ability: {
			description: 'After you spend Iron tokens, you heal 1.'
		},
		actions: [
			{
				name: 'You, Stay',
				levels: [
					{
						tokenCost: [
							{
								number: 2,
								tokenType: Token.Iron
							}
						],
						description: 'Challenge an enemy within range.\nThat enemy discards three Speed tokens.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Cyborg',
		name: 'Incinerator',
		minRange: 1,
		maxRange: 3,
		ability: {
			description:
				'When you spend Power tokens to boost the damage a hit deals, give one Burning token to the target of that hit.'
		},
		actions: [
			{
				name: 'Flamethrower',
				levels: [
					{
						tokenCost: [
							{
								number: 2,
								tokenType: Token.Power
							}
						],
						description:
							'Choose an enemy within range. They take 1 damage, gain one Burning token, and are pushed 1 space.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Cyborg',
		name: 'Machine',
		minRange: 1,
		maxRange: 2,
		ability: {
			description:
				'You may spend your Basic Tokens as if they were any other Basic Tokens. The Basic Tokens are Iron, Power, and Speed tokens.'
		},
		actions: [
			{
				name: 'High Efficiency',
				levels: [
					{
						diceCost: [1],
						description:
							'Choose three: You heal 1; you gain one Iron token; you gain one Power token; you gain one Speed token; or you deal 1 damage to an enemy within range.'
					},
					{
						diceCost: [4],
						description: 'Choose the last two options.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Cyborg',
		name: 'Rocket',
		minRange: 1,
		maxRange: 1,
		ability: {
			description: 'After you push someone, you may teleport to any empty space adjacent to them.'
		},
		actions: [
			{
				name: 'Rocket Tackle',
				levels: [
					{
						tokenCost: [
							{
								number: 2,
								tokenType: Token.Speed
							}
						],
						description: 'Push an adjacent enemy or ally two spaces.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Cyborg',
		name: 'Syphon',
		minRange: 1,
		maxRange: 2,
		ability: {
			description:
				'At the end of your turn, choose a token you hold. Either replace it with a Power token, or gain another copy of it.'
		},
		actions: [
			{
				name: 'Power Converter',
				levels: [
					{
						diceCost: [2],
						description:
							'Target a single token held by you or someone within range.\nChoose one or both: You steal the targeted token(s) from them; and/or replace the targeted token(s) with Power tokens.'
					},
					{
						diceCost: [6],
						description:
							"The Choice Effect applies to every token they hold of the targeted token's type."
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Demon',
		name: 'Dark',
		minRange: 2,
		maxRange: 4,
		ability: {
			description:
				'You can see and target enemies through Fog.\nAt the end of your turn, place a Fog obstacle into your space.'
		},
		actions: [
			{
				name: 'Darkness Dawns',
				levels: [
					{
						diceCost: [4],
						description:
							'Place two Fog obstacles into empty spaces within range.\nYou may teleport to one of those Fog obstacles.'
					}
				]
			},
			{
				name: 'Twilight Sorrow',
				levels: [
					{
						diceCost: [4],
						description:
							'Each enemy standing in Fog gains one Weakness token.\nYou gain one Speed token for each enemy affected.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Demon',
		name: 'Ogre',
		minRange: 1,
		maxRange: 2,
		ability: {
			description:
				'Your Throw Actions may target any number of enemies within range. After you Throw an enemy, they take 1 damage.'
		},
		actions: [
			{
				name: 'Watch Your Step',
				levels: [
					{
						diceCost: [3],
						description:
							'Choose an enemy you can see that moved during this turn. You deal 2 damage to them.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Demon',
		name: 'Slasher',
		minRange: 1,
		maxRange: 1,
		ability: {
			description: 'At the end of every turn, you deal 1 damage to an adjacent enemy'
		},
		actions: [
			{
				name: 'Suddenly...',
				levels: [
					{
						diceCost: [4],
						description:
							'Teleport into an empty space adjacent to someone who is alone.\nSomeone is alone if nobody is adjacent to them.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Demon',
		name: 'Vampire',
		minRange: 1,
		maxRange: 1,
		ability: {
			description:
				'After you deal damage with a hit, you heal 1.\nAfter you give Weakness tokens to an enemy, you gain that many Power tokens.'
		},
		actions: [
			{
				name: 'Life Steal',
				levels: [
					{
						diceCost: [4],
						description:
							'Deal 2 damage to an enemy within range.\nYou may give that enemy one Weakness token.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Demon',
		name: 'Zombie',
		minRange: 1,
		maxRange: 1,
		ability: {
			description: 'You have Armor. At the start of your turn, if your HP is 3 or less, you heal.'
		},
		actions: [
			{
				name: 'Hunger',
				levels: [
					{
						diceCost: [4],
						description:
							'Deal 2 damage to an enemy within range.\nYou may take one token from that enemy.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Flametongue',
		name: 'Burning',
		minRange: 2,
		maxRange: 4,
		ability: {
			description:
				'After you target an enemy with an Action, if they have four Burning tokens or less, give them 1 Burning token.'
		},
		actions: [
			{
				name: 'Burn It All Down',
				levels: [
					{
						diceCost: [4],
						description:
							'Target one enemy within range. Give them one Burning token and put a Trap into their space.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Flametongue',
		name: 'Explosion',
		minRange: 2,
		maxRange: 4,
		ability: {
			description:
				'After you deal damage to an enemy, push that enemy one space.\nAfter you destroy an obstacle, replace it with an Edge.'
		},
		actions: [
			{
				name: 'Ka-Boom!',
				levels: [
					{
						diceCost: [6],
						description:
							'Deal 2 damage to an enemy within range.\nThen, destroy every obstacle adjacent to them.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Flametongue',
		name: 'Inferno',
		minRange: 1,
		maxRange: 2,
		ability: {
			description:
				'At the end of your turn, after your Burning tokens have already triggered, you gain three Burning tokens.\nAfter an enemy deals damages to you with an Action, you may give them all of your Burning tokens.'
		},
		actions: [
			{
				name: 'Ignition',
				levels: [
					{
						tokenCost: [
							{
								number: 1,
								tokenType: Token.Burning
							}
						],
						description:
							'Give one Burning token to an enemy within range.\nYou can only use Ignition once per turn.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Flametongue',
		name: 'Phoenix',
		minRange: 1,
		maxRange: 1,
		ability: {
			description:
				'Whenever you would take damage from Burning tokens or from Traps, you heal that much damage instead.'
		},
		actions: [
			{
				name: 'Cleansing Fire',
				levels: [
					{
						diceCost: [4],
						description:
							'Choose two: Give a Burning token to someone within range; heal an ally within range; or place a Trap within range.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Flametongue',
		name: 'Volcanic',
		minRange: 1,
		maxRange: 3,
		ability: {
			description:
				'After you spend Speed tokens on Free Movement, you may place a Trap into each space you exit.\nYou do not take damage from entering a space with a Trap.'
		},
		actions: [
			{
				name: 'Pyroclasm',
				levels: [
					{
						diceCost: [4],
						description:
							'Place three Traps within range. Each Trap placed by this Action must be adjacent to a Trap obstacle.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Gunkata',
		name: 'Akimbo',
		minRange: 3,
		maxRange: 5,
		ability: {
			description: 'After you deal damage to someone, you move one space.'
		},
		actions: [
			{
				name: 'Firing Wild',
				levels: [
					{
						diceCost: [4],
						description:
							'Choose one: Deal 1 damage to every enemy and ally adjacent to you; or deal 1 damage to every enemy and ally within range.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Gunkata',
		name: 'Artillery',
		minRange: 3,
		maxRange: 8,
		ability: {
			description: 'You can see and target enemies through Fog and Walls.'
		},
		actions: [
			{
				name: 'Bombardment',
				levels: [
					{
						diceCost: [1],
						description: 'Place a Trap into a space within range.'
					},
					{
						diceCost: [6],
						description:
							'Place a Trap into each space adjacent to the first Trap.\nDo not place these Traps over Edges or Walls.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Gunkata',
		name: 'Crosshair',
		minRange: 4,
		maxRange: 8,
		ability: {
			description:
				'You ignore Armor and Shields when dealing damage.\nWeakness tokens you hold and Iron tokens your enemies hold do not reduce the damage you deal.'
		},
		actions: [
			{
				name: 'Take Aim',
				levels: [
					{
						diceCost: [1],
						description:
							'Your next Action this turn has its cost and every number listed in its description increased by 1.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Gunkata',
		name: 'Ricochet',
		minRange: 2,
		maxRange: 4,
		ability: {
			description:
				'After you deal damage to an enemy with an Action, you may deal 1 damage to a different enemy within 3 spaces of them.'
		},
		actions: [
			{
				name: 'Trick Shot',
				levels: [
					{
						diceCost: [3],
						description:
							'Choose one obstacle within range.\nDeal 2 damage to an enemy within 3 spaces of that obstacle.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Gunkata',
		name: 'Ten Thousand',
		minRange: 2,
		maxRange: 3,
		ability: {
			description: "Add two d4's to your Action Dice."
		},
		actions: [
			{
				name: 'Point Blank Shot',
				levels: [
					{
						diceCost: [2],
						description: 'Deal 1 damage to an adjacent enemy.  Then, push them 1 space.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Phantom',
		name: 'Aura',
		minRange: 1,
		maxRange: 3,
		ability: {
			description:
				'At the start of your turn, you gain a 3 point Shield.\nWhen an enemy within range damages or breaks a Shield, you may move that enemy one space.\nAfter a Shield within range breaks, you gain 1 Iron token.'
		},
		actions: [
			{
				name: 'Shields Up',
				levels: [
					{
						tokenCost: [
							{
								number: 3,
								tokenType: Token.Basic
							}
						],
						description: 'An ally within range gains a 3 point Shield.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Phantom',
		name: 'Crying',
		minRange: 1,
		maxRange: 4,
		ability: {
			description:
				'At the start of your turn, give one Weakness token to all enemies within range.\nAt the end of your turn, Challenge an enemy within range and give them one Weakness token.'
		},
		actions: [
			{
				name: "Banshee's Wail",
				levels: [
					{
						diceCost: [6],
						description:
							'All enemies within range gain a Weakness token.\nAll Traps and Walls within range become Rubble'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Phantom',
		name: 'Puppet',
		minRange: 1,
		maxRange: 5,
		ability: {
			description:
				'You may use Speed tokens to move any ally, enemy, or obstacle within range, using the normal Free Movement rules.\nWalls and Traps you move with this Ability become Rubble.\nEdges cannot be moved with this Ability.'
		},
		actions: [
			{
				name: 'Pull The Strings',
				levels: [
					{
						diceCost: [3],
						description: 'Choose an enemy or ally you can see. Move them 3 spaces.'
					},
					{
						diceCost: [5],
						description: 'Choose an enemy or ally you can see. Move them 3 spaces.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Phantom',
		name: 'Spirit',
		minRange: 1,
		maxRange: 3,
		ability: {
			description:
				'Edges cannot remove your Copies from play. You and your Copies can move over Walls as though they were empty space.\nAfter you use Free Movement on yourself or your Copy, you may move any number of your Copies one space.'
		},
		actions: [
			{
				name: 'Now You See Me...',
				levels: [
					{
						diceCost: [1],
						description: 'Place a Copy into an empty space within range.'
					},
					{
						diceCost: [3],
						description: 'Place a Copy into an empty space within range.'
					},
					{
						diceCost: [5],
						description: 'Place a Copy into an empty space within range.'
					}
				]
			},
			{
				name: "...Now You Don't",
				levels: [
					{
						otherCost: ['Destroy 1 Copy'],
						description:
							"...Now You Don't is a Token Action, but the Cost is one of your Copies.\nTeleport into the space of the destroyed Copy."
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Phantom',
		name: 'Vortex',
		minRange: 1,
		maxRange: 3,
		ability: {
			description:
				'Edges cannot remove you from play. When you stand on an Edge, every other Edge counts as an adjacent space you can move to.'
		},
		actions: [
			{
				name: 'Black Hole',
				levels: [
					{
						diceCost: [4],
						description: 'Place an Edge into an empty space within range.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Punk',
		name: 'Bleeding',
		minRange: 1,
		maxRange: 1,
		ability: {
			description:
				"You don't get Taken Out at zero HP. You can continue to fight as long as you remain in play. Your side still loses if everyone in play is at zero HP at the same time."
		},
		actions: [
			{
				name: 'Lash Out',
				levels: [
					{
						otherCost: ['2 HP'],
						description:
							"Lash Out is a Token Action that spends your HP.\nYou can't spend HP you do not have.\nPush an adjacent enemy two spaces."
					}
				]
			},
			{
				name: "I'm Still Here",
				levels: [
					{
						diceCost: [12],
						description: 'Deal 7 damage to an enemy within range.\nThen, push that enemy 7 spaces.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Punk',
		name: 'Brawling',
		minRange: 1,
		maxRange: 1,
		ability: {
			description:
				"After your Shield breaks, you gain 1 Power token.\nAfter you deal damage, if you didn't spend a Power token on that hit, you gain 1 Power token."
		},
		actions: [
			{
				name: 'Tough It Out',
				levels: [
					{
						tokenCost: [
							{
								number: 2,
								tokenType: Token.Power
							}
						],
						description: 'You gain a 2 point Shield.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Punk',
		name: 'Flashy',
		minRange: 1,
		maxRange: 1,
		ability: {
			description:
				'After you roll your Action Dice, you may combine two of your numbers into a single, larger number.'
		},
		actions: [
			{
				name: 'Show Off',
				levels: [
					{
						otherCost: ['X'],
						description:
							'Choose two of these Basic Actions: Movement, Damage, A Challenger Approaches, Put It Out!, or Throw.\nPerform both of those Actions as if you had spent X on them.\nYou can only use Show Off once per turn.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Punk',
		name: 'Knockdown',
		minRange: 1,
		maxRange: 1,
		ability: {
			description: 'After you take damage from an enemy, you deal 1 damage back to them.'
		},
		actions: [
			{
				name: 'Take It On The Chin',
				levels: [
					{
						diceCost: [4],
						description:
							'Each enemy within range deals 1 damage to you.\nThen, you deal 3 damage to one of them.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Punk',
		name: 'Taunting',
		minRange: 1,
		maxRange: 1,
		ability: {
			description:
				'After you take damage, you gain 1 Iron token.\nAfter you take damage from an enemy with your Challenge, you may move one space.'
		},
		actions: [
			{
				name: 'Is That All You Got?',
				levels: [
					{
						diceCost: [1],
						description: 'Challenge an enemy you can see. You gain 1 Iron token.'
					}
				]
			},
			{
				name: 'Not Good Enough',
				levels: [
					{
						otherCost: ['X'],
						description:
							'Give X - 2 Weakness tokens to an enemy with your Challenge.Then, they discard your Challenge.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Teacher',
		name: 'Patient',
		minRange: 1,
		maxRange: 1,
		ability: {
			description:
				'At the end of your turn, your Speed tokens become Iron tokens.\nYou may only take one Action per turn.\nYour Action Pool does not empty between Turns or Rounds.'
		},
		actions: [
			{
				name: 'Waiting Game',
				levels: [
					{
						otherCost: ['X'],
						description:
							'Add X+1 to your Action Pool. Then, you may move one space.You can only use Waiting Game during enemy turns.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Teacher',
		name: 'Elder',
		minRange: 1,
		maxRange: 2,
		ability: {
			description:
				"The cost of this Stance's Unique Actions are reduced by 1 (to a minimum of 1+ or 2 tokens).\nOnce per turn, during your turn, you may use any Unique Action you know, from among all of your Stances, for free. It does not cost any tokens or numbers to use. If your free Action is a Tiered Action, you perform it as if you spent a 7."
		},
		actions: []
	},
	{
		parentArchetypeName: 'Teacher',
		name: 'Mastermind',
		minRange: 0,
		maxRange: 0,
		ability: {
			description:
				"You cannot perform Actions. Instead, you spend your numbers on your allies, making them perform Actions for you.\nEach Action you take uses an ally's current location, range, and Stance bonuses as if they'd taken that Action themselves. You can only give Actions to allies you can see.\nAfter each Action an ally performs during your turn, you may move 1 space."
		},
		actions: []
	},
	{
		parentArchetypeName: 'Teacher',
		name: 'Motivating',
		minRange: 1,
		maxRange: 2,
		ability: {
			description:
				'At the end of your turn, allies within range heal, and you gain an Inspired token.'
		},
		actions: [
			{
				name: 'You Can Do It!',
				levels: [
					{
						diceCost: [4],
						description:
							'Choose an ally within range. They choose two: They heal; they move two spaces; they gain a copy of a token they hold; or they discard one token they hold.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Teacher',
		name: 'Training',
		minRange: 1,
		maxRange: 1,
		ability: {
			description:
				'At the end of your turn, give an ally one Training token.\nTraining Token: Before performing an Action, you may spend a Training token to increase all numbers listed in that Action by 1, including its cost. You may only spend 1 Training token per turn.'
		},
		actions: [
			{
				name: 'Watch Closely',
				levels: [
					{
						diceCost: [3],
						description:
							'You gain one Training Token. If you spend it before the end of this turn, give one Training Token to an ally.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Trickster',
		name: 'Caged',
		minRange: 1,
		maxRange: 1,
		ability: {
			description: 'Adjacent enemies cannot gain or spend Speed tokens.'
		},
		actions: [
			{
				name: 'Welcome To My Maze',
				levels: [
					{
						diceCost: [2],
						description:
							'Deal 1 damage to one enemy outside of your Range.\nThen, pull them three spaces.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Trickster',
		name: 'Mysterious',
		minRange: 1,
		maxRange: 2,
		ability: {
			description:
				'At the start of your turn, place a Fog obstacle into your space.\nWhile you stand in Fog, your maximum range is doubled.'
		},
		actions: [
			{
				name: 'Ghost Walk',
				levels: [
					{
						tokenCost: [
							{
								number: 3,
								tokenType: Token.Speed
							}
						],
						description:
							'Place a Fog obstacle into an empty space within range.\nThen, teleport to a Fog obstacle within range.'
					},
					{
						tokenCost: [
							{
								number: 3,
								tokenType: Token.Iron
							}
						],
						description:
							'Place a Fog obstacle into an empty space within range.\nThen, teleport to a Fog obstacle within range.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Trickster',
		name: 'Illusion',
		minRange: 1,
		maxRange: 3,
		ability: {
			description:
				'After an enemy deals damage to you while within range of at least\none of your Copies, you deal 1 damage to them. If they are within range of three or more Copies, you deal 2 damage to them instead.\nYou may spend your Copies as Iron tokens.'
		},
		actions: [
			{
				name: 'Where Are You Looking?',
				levels: [
					{
						diceCost: [3],
						description: 'Place 2 Copies into empty spaces within range.'
					},
					{
						diceCost: [6],
						description: 'Place 2 more Copies into empty spaces within range.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Trickster',
		name: 'Hidden',
		minRange: 1,
		maxRange: 3,
		ability: {
			description:
				'You may move through Walls as though they were empty spaces.\nYou can see and target enemies through Walls.'
		},
		actions: [
			{
				name: 'Sudden Strike',
				levels: [
					{
						tokenCost: [
							{
								number: 3,
								tokenType: Token.Iron
							}
						],
						description: 'Deal 2 damage to an enemy within range.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Trickster',
		name: 'Whip',
		minRange: 2,
		maxRange: 5,
		ability: {
			description:
				'Your Throw Actions target one person within range.\nWhen you Throw or Grapple an enemy, they take 2 damage.'
		},
		actions: [
			{
				name: 'Grapple Hook',
				levels: [
					{
						diceCost: [5],
						description: 'Teleport to any empty space within range.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Underdog',
		name: 'Collateral',
		minRange: 1,
		maxRange: 2,
		ability: {
			description: 'After you destroy an obstacle, you gain one Basic token of your choice.'
		},
		actions: [
			{
				name: 'Roughhousing',
				levels: [
					{
						diceCost: [3],
						description:
							"Destroy an obstacle within range, then choose one: Teleport to that obstacle's space; deal 1 damage to each enemy adjacent to the destroyed obstacle; or destroy another obstacle within range.\nYou can spend 2 Basic Tokens to choose a second option from the list, or 3 Basic Tokens to choose all three."
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Underdog',
		name: 'Distracting',
		minRange: 1,
		maxRange: 2,
		ability: {
			description:
				'After an enemy deals damage to you, if they have no Weakness tokens, give that enemy one Weakness token.'
		},
		actions: [
			{
				name: 'Flare',
				levels: [
					{
						diceCost: [1],
						tokenCost: [
							{
								number: 2,
								tokenType: Token.Basic
							}
						],
						description:
							'Flare can be used as either a Simple or Token Action.\nMove one space, then give one Weakness token to one enemy within range.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Underdog',
		name: 'Eye of the ...',
		minRange: 1,
		maxRange: 1,
		ability: {
			description: 'At the start of your turn, you gain a Bonus of your choice.'
		},
		actions: [
			{
				name: 'Thrill of the Fight',
				levels: [
					{
						diceCost: [3],
						description:
							'Target an adjacent enemy, then choose one: Challenge them; you deal 2 damage to them; or give them 2 Burning tokens.\nYou can spend 2 Basic Tokens to choose a second option from the list, or 3 Basic Tokens to choose all three.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Underdog',
		name: 'Lucky',
		minRange: 1,
		maxRange: 1,
		ability: {
			description: 'You have Armor.\nAdd a d4 to your Action Dice.'
		},
		actions: [
			{
				name: 'Just What I Needed',
				levels: [
					{
						diceCost: [3],
						description:
							'Choose one: You gain 2 Basic tokens; you teleport two or three spaces; or you heal.\nYou can spend 2 Basic Token to choose a second option from the list, or 3 Basic Tokens to choose all three.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Underdog',
		name: "Misfortune's",
		minRange: 1,
		maxRange: 3,
		ability: {
			description:
				'When you would take damage from a Trap, deal that damage to an enemy within range instead. If no enemies are within range, gain one Power token instead.'
		},
		actions: [
			{
				name: 'Bad Luck',
				levels: [
					{
						diceCost: [1],
						tokenCost: [
							{
								number: 3,
								tokenType: Token.Basic
							}
						],
						description:
							'Bad Luck can be used as either a Simple or Token Action.\nPlace a Trap into a space within range.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Wardancer',
		name: 'Forbidden',
		minRange: 1,
		maxRange: 2,
		ability: {
			description:
				"At the start of your turn, you take 2 damage. This damage cannot drop you below 1 HP on your current Health Bar.\nThis Style is attached to two Forms. You have the Abilities and Unique Actions from each Form. Do not use the Action Dicelisted in those Forms. This Stance's Action Dice are determined by combining the results of the following chart:\nBlaster: d8            Reversal: d8 d4\nControl: d8 d6       Shadow: d4 d4 d4\nDance: d8 d6        Song: d8 d4\nIron: d6 d6            Vigilance: d6 d6\nOne-Two: d6 d4    Wild: d10\nPower: d10 d4       Zen: 5 3"
		},
		actions: []
	},
	{
		parentArchetypeName: 'Wardancer',
		name: 'Lightning',
		minRange: 1,
		maxRange: 1,
		ability: {
			description: 'After you deal damage, you gain 1 Speed token.'
		},
		actions: [
			{
				name: 'Deadly Dance',
				levels: [
					{
						diceCost: [2],
						description: 'Teleport 2 spaces. Deal 1 damage to an enemy within range.'
					},
					{
						diceCost: [5],
						description: 'Teleport 2 spaces. Deal 2 damage to an enemy within range.'
					},
					{
						diceCost: [8],
						description: 'Teleport 2 spaces. Deal 2 damage to an enemy within range.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Wardancer',
		name: 'Overwhelming',
		minRange: 1,
		maxRange: 1,
		ability: {
			description:
				'You ignore Armor when dealing damage.\nWhen an enemy hits you with an Action, you may spend a Power token to deal 1 damage to them and push them 1 space.'
		},
		actions: [
			{
				name: 'Power Strike',
				levels: [
					{
						diceCost: [4],
						description: 'Deal 2 damage to an enemy within range. You gain 2 Power tokens.'
					},
					{
						diceCost: [8],
						description: 'Deal 4 damage and gain 4 Power tokens instead.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Wardancer',
		name: 'Relentless',
		minRange: 1,
		maxRange: 1,
		ability: {
			description:
				'When you deal damage to an enemy, immediately push them one space and then move into the empty space they left.\nIf you damage multiple enemies at the same time, push all of them one space, then move into one of the empty spaces they left.'
		},
		actions: [
			{
				name: 'Rush Down',
				levels: [
					{
						diceCost: [3],
						description:
							'Deal 1 damage to an enemy within range. Then, deal 1 damage to an enemy within range.'
					},
					{
						diceCost: [5],
						description: 'Then, deal 1 damage to an enemy within range.'
					},
					{
						diceCost: [7],
						description: 'Then, deal 1 damage to an enemy within range.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Wardancer',
		name: 'Weightless',
		minRange: 1,
		maxRange: 1,
		ability: {
			description:
				'All spaces are Empty spaces to you.\nEdges cannot remove you from play.\nRubble does not make you discard Speed tokens.\nTraps deal no damage to you.'
		},
		actions: [
			{
				name: 'Effortless',
				levels: [
					{
						diceCost: [4],
						description: 'Teleport to any space you can see.'
					},
					{
						diceCost: [7],
						description: 'Choose an ally. They may teleport to any space they can see.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Winterblossom',
		name: 'Crystal',
		minRange: 1,
		maxRange: 2,
		ability: {
			description:
				'When one of your Copies is destroyed, it deals 1 damage to everyenemy adjacent to it.'
		},
		actions: [
			{
				name: 'Splinter',
				levels: [
					{
						diceCost: [3],
						description:
							'Place a Copy of you into any space within range. Then, deal 1 damage to every enemy adjacent to that Copy.'
					},
					{
						diceCost: [6],
						description:
							'Place a Copy of you into any space within range. Then, deal 1 damage to every enemy adjacent to that Copy.'
					}
				]
			},
			{
				name: 'Shatter',
				levels: [
					{
						otherCost: ['Free'],
						description:
							'Shatter is a Token Action that costs nothing.\nDestroy one of your Copies. Give one Weakness token to an enemy that was within range of that Copy.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Winterblossom',
		name: 'Frozen',
		minRange: 1,
		maxRange: 1,
		ability: {
			description:
				'After an enemy moves into an empty space adjacent to you, you may give them one Weakness token.'
		},
		actions: [
			{
				name: 'Exploit Weakness',
				levels: [
					{
						diceCost: [3],
						description:
							'Choose one enemy within range. Give them one Weakness token and deal 2 damage to them.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Winterblossom',
		name: 'Precision',
		minRange: 1,
		maxRange: 2,
		ability: {
			description:
				'Your Actions deal +1 damage to enemies with Armor or Shields.\nWhen you target an enemy with an Action, they must discard 1 Iron token.'
		},
		actions: [
			{
				name: 'Perfect Strike',
				levels: [
					{
						diceCost: [3, 3],
						description:
							'This Action costs two numbers to perform.\nDeal 4 damage to an enemy within range. This damage cannot be reduced by Armor and ignores Shields. Tokens and Abilities cannot be used in response to Perfect Strike.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Winterblossom',
		name: 'Pressure',
		minRange: 1,
		maxRange: 2,
		ability: {
			description: 'At the start of your turn, give one Weakness token to every enemy within range.'
		},
		actions: [
			{
				name: 'Apply Pressure',
				levels: [
					{
						diceCost: [5],
						description:
							'Choose one enemy within range. Deal damage to them equal to the number of tokens they hold.\nYou can only use Apply Pressure once per turn.'
					}
				]
			}
		]
	},
	{
		parentArchetypeName: 'Winterblossom',
		name: 'Reflected',
		minRange: 2,
		maxRange: 3,
		ability: {
			description:
				'At the start of your turn, you may place up to three Walls into empty adjacent spaces.\nYou can see and target enemies through Walls.'
		},
		actions: [
			{
				name: 'Walled In',
				levels: [
					{
						diceCost: [3],
						description: 'Place 3 Walls into empty spaces within Range 1-3.'
					}
				]
			},
			{
				name: 'Icicle Fall',
				levels: [
					{
						diceCost: [3],
						description: 'Deal 1 damage to each enemy adjacent to any Walls.'
					}
				]
			}
		]
	}
];
export const builds: Build[] = [
	{
		name: 'Agile',
		description: 'At the start of your turn you gain 2 speed tokens'
	},
	{
		name: 'Overpowering',
		description: 'At the start of your turn, you gain 1 Power token'
	},
	{
		name: 'Tough',
		description: 'At the start of your turn, you gain 1 Iron token'
	},
	{
		name: 'Bumbling',
		description: 'At the end of any turn you took damage, you may move 1 space'
	},
	{
		name: 'Scheming',
		description:
			'At either the start or the end of your turn, you may place one Trap into an adjacent space'
	},
	{
		name: 'Mysterious',
		description:
			'At the start of your turn, you may place a Copy or Fog obstacle into an empty adjacent space'
	}
];
