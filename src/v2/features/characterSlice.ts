import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  Advancement,
  Character,
  CharacterArchetype,
  CharacterType,
  isCharacterHero,
  isFocusedHero,
} from "../types"

const initialState: Character = {
  name: "Jimmy Space",
  type: "Focused Hero",
  xp: 0,
  advancements: [],
}

export const CharacterSlice = createSlice({
  name: "character",
  initialState: () => initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    setType: (state, action: PayloadAction<CharacterType>) => {
      state.type = action.payload
      if (isFocusedHero(state)) {
        state.archetypes = []
      }
    },
    setXp: (state, action: PayloadAction<number>) => {
      state.xp = action.payload
    },
    applyAdvancement: (state, action: PayloadAction<Advancement>) => {
      const advancements = [
        ...state.advancements.filter(adv => adv.level !== action.payload.level),
        action.payload,
      ]
      advancements.sort((a1, a2) => a1.level - a2.level)
      state.advancements = advancements
      // reset existing state, then apply all the advancements again
      // split by character type where necessary

      // TODO other character types
      if (isFocusedHero(state)) {
        state.archetypes = []
        state.stances = []
        for (let adv of advancements) {
          state.build = adv.build ?? state.build
          state.archetypes.push(...Object.values(adv.archetypes))
          state.stances.push(...Object.values(adv.stances))
          // these overwrite at each level
          state.bonusHp = adv.bonusHp
          state.bonusDie = adv.bonusDie
        }
      }
    },
    revertToLevel: (state, action: PayloadAction<number>) => {
      state.advancements = state.advancements.filter(
        adv => adv.level <= action.payload,
      )
    },
  },
  selectors: {
    getLevel: (state): number => {
      return Math.max(...state.advancements.map(adv => adv.level), 1)
    },
  },
})

export const { applyAdvancement, revertToLevel, setName, setType, setXp } =
  CharacterSlice.actions
export const { getLevel } = CharacterSlice.selectors
