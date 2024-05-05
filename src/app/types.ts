export enum Dice {
  d4 = "d4",
  d6 = "d6",
  d8 = "d8",
  d10 = "d10",
}

export enum Token {
  Speed = "Speed",
  Iron = "Iron",
  Power = "Power",
  Basic = "Basic", // TODO represent basic/any as sum of other tokens
  Burning = "Burning",
  Chaos = "Chaos",
  Challenge = "Challenge",
  Inspired = "Inspired",
  Training = "Training",
  Weakness = "Weakness",
  Any = "Any",
}

export interface Action {
  name: string
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

export interface Ability {
  description: string
  extra?: string // for ability clarifications, if any
}

export interface FormRangeModifier {
  relMaxRange?: number
  absMinRange?: number
}
export interface Form {
  key: string
  name: string
  ability: Ability
  actionDice: Dice[] | number[]
  actions: Action[]
  rangeModifiers?: FormRangeModifier[]
  // TODO skills, though not hugely important
}

export interface Style {
  key: string
  parentArchetypeName: string
  name: string
  maxRange: number
  minRange: number
  ability: Ability
  actions: Action[]
}

export enum HeroType {
  Focused = "Focused",
  Fused = "Fused",
  Frantic = "Frantic",
}

export interface Archetype {
  key: string
  name: string
  focusedAbility: Ability
  fusedAbility: Ability
  franticAbility: Ability
  extra?: string // for ability clarifications, if any
}

export interface Build {
  key: string
  name: string
  description: string
}

export interface Stance {
  name: string
  style: Style
  form: Form
}

export enum CharacterType {
  Hero = "Hero",
  Stooge = "Stooge",
  Warrior = "Warrior",
  Boss = "Boss",
}

// dummy fixed length array types
type ArchetypeArray = [Archetype, Archetype, Archetype]
type StyleArray = [Style, Style, Style]
type FormArray = [Form, Form, Form]
//combined state for the currently selected/displayed hero
export interface Hero {
  characterType: CharacterType
  name: string
  type: HeroType
  build: Build
  archetypes: ArchetypeArray
  forms: FormArray
  selectedFormIndex: number
  styles: StyleArray
  selectedStyleIndex: number
}

export interface TokenDisplay {
  value: number
  helpText: string
}
export interface TokenState {
  speed: TokenDisplay
  iron: TokenDisplay
  power: TokenDisplay
  burning: TokenDisplay
  weakness: TokenDisplay
  chaos: TokenDisplay
  control: TokenDisplay
  inspired: TokenDisplay
  training: TokenDisplay
  [key: string]: TokenDisplay
}

export interface GameState {
  health: number
  healthBars: number
  shields: number
  extraShields: string
  // hasArmor: boolean
  challenging: string
  challengedBy: string
  tokens: TokenState
}
