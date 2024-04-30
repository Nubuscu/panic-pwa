import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import type { GameState } from "../../app/types"
import type { RootState } from "../../app/store"

interface TokenUpdate {
  type: string // state key, not Token enum
  value: number
}
const initialState: GameState = {
  health: 0,
  healthBars: 1,
  shields: 0,
  extraShields: [],
  challenging: "",
  challengedBy: "",
  tokens: {
    speed: {
      value: 0,
      helpText:
        "Use for free movement, usually discarded at the end of every turn",
    },
    iron: {
      value: 0,
      helpText:
        "Spend up to 2 to negate that much damage and movement from a single attack",
    },
    power: {
      value: 0,
      helpText:
        "Spend to make a hit deal 1 extra damage and push the target back (normally 1 per attack)",
    },
    burning: {
      value: 0,
      helpText:
        "At the end of your turn, take [N tokens held] damage, then discard one",
    },
    weakness: {
      value: 0,
      helpText: "Reduce next attack damage by 2, then discard one",
    },
    chaos: { value: 0, helpText: "Use at any time to take a 4 action" },
    control: {
      value: 0,
      helpText:
        "Spend 1 to negate an action within range, spend 2 to redirect it",
    },
    inspired: {
      value: 0,
      helpText:
        "During an ally's turn, spend one to add a d8 to their action pool",
    },
    training: {
      value: 0,
      helpText: "Use before an action to increase all numbers (including cost)",
    },
  },
}

export const gameStateSlice = createSlice({
  name: "gameState",
  initialState,
  reducers: {
    setHealth: (state, action: PayloadAction<number>) => {
      state.health = action.payload
    },
    setHealthBars: (state, action: PayloadAction<number>) => {
      state.healthBars = action.payload
    },
    setShields: (state, action: PayloadAction<number>) => {
      state.shields = action.payload
    },
    // TODO extra shields, for Zen form
    setChallenging: (state, action: PayloadAction<string>) => {
      state.challenging = action.payload
    },
    setChallengedBy: (state, action: PayloadAction<string>) => {
      state.challengedBy = action.payload
    },
    setToken: (state, action: PayloadAction<TokenUpdate>) => {
      if (Object.hasOwn(state.tokens, action.payload.type)) {
        state.tokens[action.payload.type].value = Math.max(
          0,
          action.payload.value,
        )
      }
    },
  },
})

export const {
  setHealth,
  setHealthBars,
  setShields,
  setChallengedBy,
  setChallenging,
  setToken,
} = gameStateSlice.actions

export const selectGameState = (state: RootState) => state.hero.gameState
