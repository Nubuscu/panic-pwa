import {
  AdvancementGrants,
  Archetype,
  Build,
  CharacterType,
  Form,
  heroTypes,
  Stance,
  Style,
} from "./types"

export const blankArchetypeReference: Archetype = {
  name: "",
  actions: [],
  focusedAbility: "",
  fusedAbility: "",
  franticAbility: "",
  keywords: [],
  superMoves: {
    alpha: {
      name: "",
      description: "",
    },
    delta: {
      name: "",
      description: "",
    },
  },
}
export const archetypesReference: Archetype[] = [
  {
    name: "Gunkata",
    focusedAbility:
      "You have access to the Spray and Pray Unique Action. At the start and end of your turn, you perform one Gunslinger Action of your choice, from those available in your current Stance.",
    fusedAbility:
      "You have access to the Spray and Pray Unique Action. At the end of your turn, you perform one Gunslinger Action of your choice, from those available in your current Stance.",
    franticAbility:
      "Until your next turn, you have access to Spray and Pray. At the start and end of this turn, you perform one Gunslinger Action of your choice, from those available in your current Stance.",
    actions: [
      {
        isArchetypeAction: true,
        name: "Spray and Pray",
        levels: [
          {
            diceCost: [4],
            description:
              "Deal 1 damage to up to four enemies within range. Any target that takes 0 damage from Spray and Pray is pushed 1 space.",
          },
        ],
      },
    ],
    superMoves: {
      alpha: {
        name: "Sniping Point",
        description:
          "Your maximum range is infinite, until the end of this Round. Then, deal 7 damage to an enemy within range.",
      },
      delta: {
        name: "Lead Rain",
        description: `Target an enemy within range.
Deal 1 damage to that enemy and all adjacent enemies, then
deal 1 damage to that enemy and all adjacent enemies, then
deal 1 damage to that enemy and all adjacent enemies, then
deal 1 damage to that enemy and all adjacent enemies, then
deal 1 damage to that enemy and all adjacent enemies.`,
      },
    },
    keywords: ["Aggro", "Zoning"],
  },
]

export const blankDefaultForm: Form = {
  name: "",
  ability: "",
  actionDice: {
    green: ["d4"],
    purple: ["d4"],
  },
  actions: [],
  keywords: [],
}
export const formsReference: Form[] = [
  {
    name: "test form pls ignore",
    ability: "nothing useful",
    actionDice: {
      green: [],
      purple: [],
    },
    actions: [
      {
        isArchetypeAction: false,
        name: "thing",
        levels: [
          {
            description: "asdf",
            diceCost: [1],
          },
        ],
      },
    ],
    keywords: ["foo"],
  },
]

export const blankDefaultStyle: Style = {
  name: "",
  ability: "",
  actions: [],
  keywords: [],
  minRange: 0,
  maxRange: 0,
  parentArchetypeName: "",
}
export const stylesReference: Style[] = [
  {
    name: "test style pls ignore",
    ability: "something",
    actions: [],
    keywords: ["bar"],
    minRange: 1,
    maxRange: 2,
    parentArchetypeName: "test",
  },
]

export const blankDefaultStance: Stance = {
  name: "",
  style: blankDefaultStyle,
  form: blankDefaultForm,
}

export const buildsReference: Build[] = []

// TODO up to level 10
// TODO villain track too
export const getAdvancementTrack = (
  characterType: CharacterType,
): AdvancementGrants[] => {
  if (heroTypes.includes(characterType as any)) {
    if (characterType === "Focused Hero") {
      return [
        {
          level: 1,
          totalStances: 3,
          setBuild: true,
          totalArchetypes: 1,
        },
        {
          level: 2,
          totalSuperMoves: 1,
          bonusDie: ["d4"],
          bonusHp: 1,
        },
        {
          level: 3,
          totalStances: 4,
          bonusDie: ["d4"],
          bonusHp: 2,
        },
        {
          level: 4,
          bonusDie: ["d6"],
          bonusHp: 2,
          totalArchetypes: 2,
          gainFusedArchetype: true,
        },
      ]
    } else if (characterType === "Fused Hero") {
      return [
        {
          level: 1,
          totalStances: 3,
          setBuild: true,
          totalArchetypes: 2,
        },
        {
          level: 2,
          totalSuperMoves: 1,
          bonusDie: ["d4"],
          bonusHp: 1,
        },
        {
          level: 3,
          totalStances: 4,
          bonusDie: ["d4"],
          bonusHp: 2,
        },
        {
          level: 4,
          bonusDie: ["d6"],
          bonusHp: 2,
          totalArchetypes: 3,
          gainFusedArchetype: true,
        },
      ]
    } else if (characterType === "Frantic Hero") {
      return [
        {
          level: 1,
          totalStances: 3,
          setBuild: true,
          totalArchetypes: 3,
        },
        {
          level: 2,
          totalSuperMoves: 1,
          bonusDie: ["d4"],
          bonusHp: 1,
        },
        {
          level: 3,
          totalStances: 4,
          bonusDie: ["d4"],
          bonusHp: 2,
        },
        {
          level: 4,
          bonusDie: ["d6"],
          bonusHp: 2,
          totalArchetypes: 4,
          gainFusedArchetype: true,
        },
      ]
    }
  }
  return []
}
