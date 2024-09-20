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
      // TODO apply an advancement to level up
    },
    revertToLevel: (state, action: PayloadAction<number>) => {
      // TODO remove all further advancements down to this level
    },
  },
  selectors: {
    getLevel: (state): number => {
      return Math.max(...state.advancements.map(adv => adv.level), 1)
    },
  },
})

export const { applyAdvancement, setName, setType, setXp } =
  CharacterSlice.actions
export const { getLevel } = CharacterSlice.selectors
