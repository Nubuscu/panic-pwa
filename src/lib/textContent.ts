import { FORM_BLASTER_AMPLIFY_3_PLUS_DESC, FORM_BLASTER_DESC, FORM_BLASTER_DICE, FORM_BLASTER_SHOCKWAVE_3_PLUS_DESC, FORM_BLASTER_SHOCKWAVE_6_PLUS_DESC, FORM_CONTROL_DESC, FORM_CONTROL_DICE, FORM_CONTROL_SUPPRESSION_3_PLUS_DESC, FORM_CONTROL_SUPPRESSION_6_PLUS_DESC, FORM_CONTROL_SUPPRESSION_9_PLUS_DESC, FORM_DANCE_DESC, FORM_DANCE_DICE, FORM_DANCE_TRY_TO_KEEP_UP_3_SPEED_TOKENS_DESC } from './strings';
import { type Style, type Form, type Archetype, Dice, Token, type Build } from './types';

export const forms: Form[] = [
	{
		name: 'Blaster',
		actionDice: FORM_BLASTER_DICE,
		ability: {
			description: FORM_BLASTER_DESC
		},
		actions: [
			{
				name: 'Amplify',
				levels: [
					{
						diceCost: [3],
						description: FORM_BLASTER_AMPLIFY_3_PLUS_DESC
					}
				]
			},
			{
				name: 'Shockwave',
				levels: [
					{
						diceCost: [3],
						description: FORM_BLASTER_SHOCKWAVE_3_PLUS_DESC
					},
					{
						diceCost: [6],
						description: FORM_BLASTER_SHOCKWAVE_6_PLUS_DESC
					}
				]
			}
		]
	}, {
		name: 'Control',
		actionDice: FORM_CONTROL_DICE,
		ability: {
			description: FORM_CONTROL_DESC
		},
		actions: [
			{
				name: 'Suppression',
				levels: [
					{
						diceCost: [3],
						description: FORM_CONTROL_SUPPRESSION_3_PLUS_DESC
					},
					{
						diceCost: [6],
						description: FORM_CONTROL_SUPPRESSION_6_PLUS_DESC
					},
					{
						diceCost: [9],
						description: FORM_CONTROL_SUPPRESSION_9_PLUS_DESC
					}
				]
			},
		]
	},
	{
		name: 'Dance',
		actionDice: FORM_DANCE_DICE,
		ability: {
			description: FORM_DANCE_DESC
		},
		actions: [
			{
				name: 'Try to keep up',
				levels: [
					{
						tokenCost: [{ tokenType: Token.Speed, number: 3 }],
						description: FORM_DANCE_TRY_TO_KEEP_UP_3_SPEED_TOKENS_DESC
					}
				]
			},
		]
	}
];

export const archetypes: Archetype[] = [
	{
		name: 'Angel',
		focusedAbility: {
			description:
				'At the start of your turn, Challenge an enemy you can see, then deal 1 damage to them, then heal 1. After you Challenge an enemy, deal 1 damage to them and heal 1'
		},
		fusedAbility: {
			description:
				'At the start of your turn, Challenge an enemy you can see, then deal 1 damage to them, then heal 1'
		},
		franticAbility: {
			description:
				'At the start of this turn, Challenge an enemy you can see, then deal 2 damage to them, and heal'
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
				'At the start of your turn, remove one token you hold. After you remove tokens using an Action or Ability, you gain an equal number of Iron tokens'
		},
		actions: [
			{
				name: 'Purify',
				levels: [
					{
						diceCost: [1],
						description: 'Remove one token from yourself or an ally within range'
					},
					{
						diceCost: [3],
						description: 'Remove up to two tokens from someone within range'
					},
					{
						diceCost: [6],
						description: 'Remove up to two tokens from someone within range'
					}
				]
			}
		]
	}
];

export const builds: Build[] = [
	{
		name: 'Bumbling',
		description: 'At the end of any turn you took damage, you may move 1 space'
	}
];
