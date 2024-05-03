import { configureStore, combineSlices } from "@reduxjs/toolkit"
import { heroSlice, serializeHero } from "../features/hero/heroSlice"
import { gameStateSlice } from "../features/hero/gameStateSlice"
import { createListenerMiddleware } from "@reduxjs/toolkit"
import type { GameState, Hero } from "./types"

const rootReducer = combineSlices(heroSlice, gameStateSlice)
export const urlMiddleware = createListenerMiddleware()

urlMiddleware.startListening({
  predicate: (action, currentState, previousState) => {
    // fire on all events, ever
    return true
  },
  effect: async (action, listenerApi) => {
    let state = listenerApi.getState() as {
      hero: { hero: Hero; gameState: GameState }
    }
    window.location.hash = `#${btoa(JSON.stringify({ hero: serializeHero(state.hero.hero) }))}`
  },
})

export const store = configureStore({
  reducer: {
    hero: rootReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(urlMiddleware.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
