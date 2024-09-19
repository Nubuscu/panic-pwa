import { AdvancementGrants, Archetype, Build, Form, Style } from "./types"

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

export const formsReference: Form[] = []

export const stylesReference: Style[] = []

export const buildsReference: Build[] = []

export const heroAdvancementGrants: AdvancementGrants[] = [
  {
    level: 1,
    extraStances: 3,
  },
  {
    level: 2,
    extraSupers: 1,
    bonusDie: "d4",
    bonusHp: 1,
  },
  {
    level: 3,
    extraStances: 1,
    bonusDie: "d4",
    bonusHp: 2,
  },
  {
    level: 4,
    bonusDie: "d6",
    bonusHp: 2,
    extraArchetype: true,
  },
  // TODO up to level 10
]

// TODO villain advancements (separate per type?)
