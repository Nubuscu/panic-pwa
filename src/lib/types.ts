export enum Dice {
    d4,
    d6,
    d8,
    d10,
}

export enum Token {
    // TODO all the token types
    // and any token (at all, not just basic)
    Speed,
    Iron,
    Power,
    AnyBasic = Speed | Iron | Power,
}


export interface Action {
    name: string
    levels: ActionLevel[]
}
export interface ActionLevel {
    diceCost?: Number[] // most actions will have a single number, handful of exceptions
    tokenCost?: Map<Token, number>
    description: string, // TODO match bits of the description to costs
}

export interface Ability {
    description: string
    extra?: string, // for ability clarifications, if any
}

export interface Form {
    name: string
    ability: Ability
    actionDice: Dice[]
    actions: Action[]
    // TODO skills, though not hugely important
}

export interface Style {
    parentArchetypeName: string
    name: string
    maxRange: number
    minRange: number
    ability: Ability
    actions: Action[]
}

export enum HeroType {
    Focused,
    Fused,
    Frantic,
}

export interface Archetype {
    name: string
    focusedAbility: Ability
    fusedAbility: Ability
    franticAbility: Ability
    extra?: string, // for ability clarifications, if any
}

export interface Stance {
    name: string
    style: Style
    form: Form
}

export interface FocusedHero {
    name: string
    type: HeroType.Focused
    archetype: Archetype
    stances: Stance[]
}
