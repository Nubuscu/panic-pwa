import { type Style, type Form, type Archetype, Dice } from "./types";

export const forms: Form[] = [
    {
        name: "Blaster",
        actionDice: [Dice.d8, Dice.d8, Dice.d8],
        ability: {
            description: "Your Actions may apply to one extra target within range. When you add Blaster Form to a Style, increase that Style's maximum range by 1."
        },
        actions: [
            {
                name: "Amplify",
                levels: [
                    {
                        diceCost: [3],
                        description: "Your next Action this turn has its range increased by 2 and may apply to up to three extra targets within range"
                    }
                ]
            },
            {
                name: "Shockwave",
                levels: [
                    {
                        diceCost: [3],
                        description: "Deal 1 damage to every enemy within range"
                    },
                    {
                        diceCost: [6],
                        description: "Deal 2 damage to one enemy within range"
                    }
                ]
            }
        ]
    }
]

export const archetypes: Archetype[] = [
    {
        name: "Angel",
        focusedAbility: {
            description: "At the start of your turn, Challenge an enemy you can see, then deal 1 damage to them, then heal 1. After you Challenge an enemy, deal 1 damage to them and heal 1"
        },
        fusedAbility: {
            description: "At the start of your turn, Challenge an enemy you can see, then deal 1 damage to them, then heal 1"
        },
        franticAbility: {
            description: "At the start of this turn, Challenge an enemy you can see, then deal 2 damage to them, and heal"
        }
    }
]

export const styles: Style[] = [
    {
        parentArchetypeName: "Angel",
        name: "Halcyon",
        minRange: 1,
        maxRange: 2,
        ability: {
            description: "At the start of your turn, remove one token you hold. After you remove tokens using an Action or Ability, you gain an equal number of Iron tokens"
        },
        actions: [
            {
                name: "Purify",
                levels: [
                    {
                        diceCost: [1],
                        description: "Remove one token from yourself or an ally within range"
                    },
                    {
                        diceCost: [3],
                        description: "Remove up to two tokens from someone within range"
                    },
                    {
                        diceCost: [6],
                        description: "Remove up to two toknes from someone within range"
                    }
                ]
            }
        ]
    }
]