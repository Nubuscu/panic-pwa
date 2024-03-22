export enum Dice {
	d4 = 'd4',
	d6 = 'd6',
	d8 = 'd8',
	d10 = 'd10'
}

export enum Token {
	Speed = 'Speed',
	Iron = 'Iron',
	Power = 'Power',
	Basic = 'Basic', // TODO represent basic/any as sum of other tokens
	Burning = 'Burning',
	Chaos = 'Chaos',
	Challenge = 'Challenge',
	Inspired = 'Inspired',
	Training = 'Training',
	Weakness = 'Weakness',
	Any = 'Any'
}

export interface Action {
	name: string;
	levels: ActionLevel[];
}
export interface TokenCost {
	tokenType: Token;
	number: number;
}
export interface ActionLevel {
	diceCost?: number[]; // most actions will have a single number, handful of exceptions
	tokenCost?: TokenCost[];
	otherCost?: string[]; // Free actions, X, or health costs
	description: string; // TODO match bits of the description to costs
}

export interface Ability {
	description: string;
	extra?: string; // for ability clarifications, if any
}

export interface Form {
	name: string;
	ability: Ability;
	actionDice: Dice[] | number[];
	actions: Action[];
	// TODO skills, though not hugely important
}

export interface Style {
	parentArchetypeName: string;
	name: string;
	maxRange: number;
	minRange: number;
	ability: Ability;
	actions: Action[];
}

export enum HeroType {
	Focused = 'Focused',
	Fused = 'Fused',
	Frantic = 'Frantic'
}

export interface Archetype {
	name: string;
	focusedAbility: Ability;
	fusedAbility: Ability;
	franticAbility: Ability;
	extra?: string; // for ability clarifications, if any
}

export interface Build {
	name: string;
	description: string;
}

export interface Stance {
	name?: string;
	style?: Style;
	form?: Form;
}

// A combined focused/fused/frantic hero
// use `type` to validate the rest
export interface Hero {
	name?: string;
	type: HeroType;
	build?: Build;
	archetype1?: Archetype;
	archetype2?: Archetype;
	archetype3?: Archetype;
	form1?: Form;
	form2?: Form;
	form3?: Form;
	style1?: Style;
	style2?: Style;
	style3?: Style;
}

export const emptyHero: Hero = {
	type: HeroType.Focused
};
