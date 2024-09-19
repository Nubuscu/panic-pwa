export type Dice = "d4" | "d6" | "d8" | "d10" | "d12"

export type BasicToken = "Speed" | "Iron" | "Power"
export type StatusToken = "Burning" | "Challenge" | "Fatigue" | "Weakness"
export type RareToken =
  | "Control"
  | "Chaos"
  | "Inspiration"
  | "Training"
  | "Super" // TODO check where super tokens go

export type Token = BasicToken | StatusToken | RareToken

export interface Action {
  name: string
  isArchetypeAction: boolean // gunkata forms give Gunslinger Actions
  levels: ActionLevel[]
}
export interface TokenCost {
  tokenType: Token
  number: number
}
export interface ActionLevel {
  diceCost?: number[] // most actions will have a single number, handful of exceptions
  tokenCost?: TokenCost[]
  otherCost?: string[] // Free actions, X, or health costs
  description: string // TODO match bits of the description to costs
}

export interface SuperMove {
  name: string
  description: string
}
export interface Archetype {
  name: string
  focusedAbility: string
  fusedAbility: string
  franticAbility: string
  superMoves: {
    alpha: SuperMove
    delta: SuperMove
  }
  // descriptors like "aggro" or "support" for synergising
  keywords: string[]
  actions: Action[] // e.g. gunkata has Gunslinger Actions
}
export interface FormRangeModifier {
  relMaxRange?: number
  absMinRange?: number
}

export interface ActionDice {
  // green + purple for all the available dice from a particular form
  // purple dice are a subset used for forbidden stances
  green: (Dice | number)[]
  purple: (Dice | number)[]
}
export interface Form {
  name: string
  ability: string
  actionDice: ActionDice
  actions: Action[]
  rangeModifiers?: FormRangeModifier[]
  keywords: string[]
}

export interface Style {
  parentArchetypeName: string
  name: string
  maxRange: number
  minRange: number
  ability: string
  actions: Action[]
  keywords: string[]
}
export interface Stance {
  name: string
  style: Style
  form: Form
}

export interface Build {
  name: string
  description: string
}

export const heroTypes = ["Focused Hero", "Fused Hero", "Frantic Hero"] as const
export type HeroType = (typeof heroTypes)[number]

export const characterTypes = [
  ...heroTypes,
  "Stooge",
  "Warrior",
  "Boss",
] as const
export type CharacterType = (typeof characterTypes)[number]

export interface Character {
  name: string
  type: CharacterType
  xp: number
  advancements: Advancement[]
}

// a set of things that the advancement ot a particular level should grant a character
export interface AdvancementGrants {
  level: number
  extraStances?: number
  extraSupers?: number
  // can always replace a form/style past level 1
  // only ever gain archetypes 1 at a time
  extraArchetype?: boolean
  improveArchetype?: boolean
  bonusDie?: Dice
  bonusHp?: number
  extra?: string // level 10 gives "Mastery" too
}
// a patch to apply to a character at each level
export interface Advancement {
  level: number
  bonusDie?: Dice
  bonusHp?: number
  // replace [0] with [1]
  replaceForm?: [string, string]
  replaceStyle?: [string, string]
  // TODO separate type or let frantics split the incoming stance?
  addStance: Stance
}

// holder types for initial character info
export interface FocusedHero extends Character {
  type: "Focused Hero"
  build: Build
  archetypes: Archetype[]
  stances: Stance[]
}

export interface FusedHero extends Character {
  type: "Fused Hero"
  build: Build
  archetypes: Archetype[]
  stances: Stance[]
}

export interface FranticHero extends Character {
  type: "Frantic Hero"
  build: Build
  archetypes: Archetype[]
  forms: Form[]
  styles: Style[]
}

// TODO furious hero?
// TODO villain interfaces
