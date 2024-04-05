import { configureStore, combineSlices } from '@reduxjs/toolkit'
import { heroSlice } from '../features/hero/heroSlice'

const rootReducer = combineSlices(heroSlice)
export const store = configureStore({
    reducer: {
        hero: rootReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch