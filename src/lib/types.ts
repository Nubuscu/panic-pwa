import { defaultArchetype, defaultForm, defaultStyle } from './textContent';

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
export class Hero {
	name?: string;
	private _type: HeroType;
	build?: Build;
	archetype1: Archetype;
	archetype2: Archetype;
	archetype3: Archetype;
	form1: Form;
	form2: Form;
	form3: Form;
	style1: Style;
	style2: Style;
	style3: Style;

	constructor(options = {}) {
		// default to focused, overwrite with options
		this._type = HeroType.Focused;
		this.archetype1 = defaultArchetype;
		this.archetype2 = defaultArchetype;
		this.archetype3 = defaultArchetype;
		this.form1 = defaultForm;
		this.form2 = defaultForm;
		this.form3 = defaultForm;
		this.style1 = defaultStyle;
		this.style2 = defaultStyle;
		this.style3 = defaultStyle;
		Object.assign(this, options);
	}

	/**
	 * custom setter to keep archetypes in sync
	 */
	public set type(v: HeroType) {
		this._type = v;
		switch (this._type) {
			case HeroType.Focused: {
				this.archetype2 = defaultArchetype;
				this.archetype3 = defaultArchetype;
				break;
			}
			case HeroType.Fused: {
				this.archetype3 = defaultArchetype;
				break;
			}
		}
	}

	public get type(): HeroType {
		return this._type;
	}

	public selectedArchetypes(): Archetype[] {
		return [this.archetype1, this.archetype2, this.archetype3].filter(
			(arch) => arch !== defaultArchetype
		);
	}
	public selectedForms(): Form[] {
		return [this.form1, this.form2, this.form3].filter((form) => form !== defaultForm);
	}
	public selectedStyles(): Style[] {
		return [this.style1, this.style2, this.style3].filter((style) => style !== defaultStyle);
	}
}
